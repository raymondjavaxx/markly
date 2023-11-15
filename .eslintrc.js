module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
  }
};
