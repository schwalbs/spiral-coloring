/**
 * Layer boundaries, top to bottom:
 *   app -> features -> shared/ui -> utils -> context -> types
 * A layer may import only layers below it; features never import each other.
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "features-not-to-app",
      comment: "features may not import the app entry/layout.",
      severity: "error",
      from: { path: "^src/features/" },
      to: { path: "^src/(App|main)\\.tsx$" },
    },
    {
      name: "no-cross-feature-imports",
      comment:
        "Each feature folder imports only its own files and lower layers, never another feature folder.",
      severity: "error",
      from: { path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/",
        pathNot: "^src/features/$1/",
      },
    },
    {
      name: "shared-ui-only-down",
      comment:
        "shared/ui may import only its own files and types, never utils, context, features or the app.",
      severity: "error",
      from: { path: "^src/shared/ui/" },
      to: { path: "^src/", pathNot: "^src/(shared/ui|types)/" },
    },
    {
      name: "utils-only-down",
      comment: "utils may import only context and types.",
      severity: "error",
      from: { path: "^src/utils/" },
      to: { path: "^src/(App|main)\\.tsx$|^src/(features|shared/ui)/" },
    },
    {
      name: "context-only-down",
      comment: "context may import only types.",
      severity: "error",
      from: { path: "^src/context/" },
      to: {
        path: "^src/(App|main)\\.tsx$|^src/(features|shared/ui|utils)/",
      },
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
