import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

// Workaround for - Error: No ESLint configuration found in "byteform\src".
import eslint from "./utils/eslint.plugin.mjs";

const tsconfig = "./tsconfig.json";
const include = ["src/**/*.ts"];

/** @type {import('rollup').RollupOptions[]} **/
export default [
  {
    input: "src/index.ts",
    output: [
      {
        // dir: "dist",
        format: "esm",
        file: "dist/esm/index.mjs",
        sourcemap: true,
      },
      {
        format: "cjs",
        file: "dist/cjs/index.cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      eslint(),
      typescript({ tsconfig, include }),
      terser({ format: { comments: false } }),
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
