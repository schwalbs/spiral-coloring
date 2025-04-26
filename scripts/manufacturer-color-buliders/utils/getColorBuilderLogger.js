import chalk from "chalk";

/**
 * @param {string} key product key, prepended to each log message
 * @param {string} color Chalk color
 * @returns {function}
 */
function getColorBuilderLogger(key, color) {
  return function (message) {
    console.log(`${chalk[color](key)} ${message}`);
  };
}

export default getColorBuilderLogger;
