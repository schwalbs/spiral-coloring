/**
 * Layer boundaries, top to bottom:
 *   app -> components -> utils -> context -> types
 * A layer may import only layers below it.
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "components-not-to-app",
      comment: "components may not import the app entry/layout.",
      severity: "error",
      from: { path: "^src/components/" },
      to: { path: "^src/(App|main)\\.tsx$" },
    },
    {
      name: "no-cross-component-imports",
      comment:
        "Each component folder imports only its own files and lower layers, never another component folder.",
      severity: "error",
      from: { path: "^src/components/([^/]+)/" },
      to: {
        path: "^src/components/",
        pathNot: "^src/components/$1/",
      },
    },
    {
      name: "utils-only-down",
      comment: "utils may import only context and types.",
      severity: "error",
      from: { path: "^src/utils/" },
      to: { path: "^src/(App|main)\\.tsx$|^src/components/" },
    },
    {
      name: "context-only-down",
      comment: "context may import only types.",
      severity: "error",
      from: { path: "^src/context/" },
      to: { path: "^src/(App|main)\\.tsx$|^src/(components|utils)/" },
    },
    {
      name: "types-import-nothing",
      comment: "types is the bottom layer and imports nothing else from src.",
      severity: "error",
      from: { path: "^src/types/" },
      to: { path: "^src/", pathNot: "^src/types/" },
    },
  ],
  options: {
    exclude: { path: "(^|/)(node_modules|dist|dev-dist|\\.claude)/" },
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.app.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"],
    },
  },
};
