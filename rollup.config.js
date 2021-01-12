import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import packageJson from "./package.json";

export default [
  {
    input: "src/Canvimation.js",
    output: {
      name: "howLongUntilLunch",
      file: packageJson.browser,
      format: "umd",
    },
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "src/Canvimation.js",
    external: ["ms"],
    output: [
      { file: packageJson.main, format: "cjs" },
      { file: packageJson.module, format: "es" },
    ],
    plugins: [babel({ babelHelpers: "bundled" })],
  },
];
