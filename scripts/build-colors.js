import * as prettier from "prettier";
import * as fs from "fs";
import * as path from "path";
import { sortFn as byColor } from "color-sorter";
import chalk from "chalk";

import colorBuilderByManufacturer from "./manufacturer-color-buliders/index.js";

const args = process.argv.slice(2);
const manufacturerArgs = args.filter((arg) => !/^--/.test(arg));

const getFilteredBuilders = () => {
  return manufacturerArgs.reduce((acc, m) => {
    const builder = colorBuilderByManufacturer[m];
    if (!builder) {
      console.log(chalk.yellow(`No builder for manufacturer '${m}'`));
      return acc;
    }

    return [...acc, builder];
  }, []);
};

const colorBuilders =
  manufacturerArgs.length > 0
    ? getFilteredBuilders()
    : Object.values(colorBuilderByManufacturer);

if (colorBuilders.length === 0) {
  console.log(
    chalk.red(
      `No builders found for manufacturers [${manufacturerArgs.join(",")}]. Exiting.`,
    ),
  );
  process.exit(0);
}

const buildResults = await Promise.allSettled(colorBuilders.map((c) => c()));

const failedBuilds = buildResults.filter(
  (result) => result.status === "rejected",
);
if (failedBuilds.length) {
  console.log(chalk.red("Error while building colors:"));
  failedBuilds.forEach((failedResult) => {
    console.log(chalk.red(failedResult.reason));
  });

  process.exit(0);
}

const manufacturers = buildResults.map((result) => result.value);
manufacturers.map((manufacturer) => {
  manufacturer.colors.sort((a, b) => byColor(a.hexCode, b.hexCode));

  return manufacturer;
});

const output = await prettier.format(JSON.stringify(manufacturers), {
  parser: "json-stringify",
});

const isDryRun = args.includes("--dry-run");

if (isDryRun) {
  console.log("DRY RUN: colors-compiled.json");
  console.log(output);
} else {
  fs.writeFile(
    path.join(import.meta.dirname, "../public/colors-compiled.json"),
    output,
    (error) => {
      if (error) console.error(error);
    },
  );
  console.log(
    `Done. Output written to ${path.join(import.meta.dirname, "../public/colors-compiled.json")}`,
  );
}
