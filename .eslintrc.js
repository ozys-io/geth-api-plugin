module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/strict-type-checked", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "**/*.spec.ts", "**/*.entity.ts"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "never",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn"
  },
};
