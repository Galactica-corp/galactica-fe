/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",

    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-enum/recommended",
    "plugin:boundaries/recommended",
    "plugin:import/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  plugins: [
    "import",
    "react",
    "react-hooks",
    "@typescript-eslint",
    "boundaries",
    "check-file",
    "typescript-enum",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
    },
    "boundaries/elements": [
      {
        type: "shared",
        pattern: "shared/*",
      },
      {
        type: "entities",
        pattern: "entities/*",
      },
      {
        type: "features",
        pattern: "features/*",
      },
      {
        type: "widgets",
        pattern: "widgets/*",
      },
      {
        type: "pages",
        pattern: "pages/*",
      },
      {
        type: "app",
        pattern: "app/*",
      },
    ],
  },
  rules: {
    "import/no-default-export": "error",
    "prettier/prettier": ["error"],
    "import/no-unresolved": "error",
    "import/namespace": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "boundaries/element-types": [
      2,
      {
        // Allow or disallow any dependency by default
        default: "allow",
        // Define a custom message for this rule
        message: "${file.type} is not allowed to import ${dependency.type}",
        rules: [
          {
            // In this type of files...
            from: ["shared"],
            // ...disallow importing this type of elements
            disallow: ["app", "entities", "features", "widgets", "pages"],
            // ...and return this custom error message
            message: "Shared must not import 'business' logic",
          },
          {
            from: ["entities"],
            disallow: ["app", "features", "widgets", "pages"],
            message: "Entity must not import more complex 'business' logic",
          },
          {
            from: ["features"],
            disallow: ["app", "widgets", "pages"],
            message: "Feature must not import more complex 'business' logic",
          },
          {
            from: ["widgets"],
            disallow: ["app", "pages"],
            message: "Widgets must not import more complex 'business' logic",
          },
          {
            from: ["pages"],
            disallow: ["app"],
            message: "Pages must not import more complex 'business' logic",
          },
        ],
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "KEBAB_CASE",
      },
    ],
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{jsx,tsx}": "KEBAB_CASE",
        "**/*.{js,ts}": "KEBAB_CASE",
      },
    ],
  },
};
