import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default tseslint.config({
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  plugins: {
    "tsdoc": tsdoc,
  },
  rules: {
    "tsdoc/syntax": "error",
    
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",

    semi: "error",
    indent: ["error", 2]
  },
});
