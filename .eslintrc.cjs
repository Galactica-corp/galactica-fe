const FS_LAYERS = [
  "app",
  "processes",
  "pages",
  "widgets",
  "features",
  "entities",
  "shared",
];

const FS_SEGMENTS = ["ui", "hooks", "utils", "config", "assets"];

const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));

const FS_SLICED_LAYERS_REG = getUpperLayers("shared").join("|");
const FS_SEGMENTS_REG = [
  ...FS_SEGMENTS,
  ...FS_SEGMENTS.map((seg) => `${seg}.*`),
].join("|");

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
      node: true,
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
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          /**
           * Allow not segments import from slices
           * @example
           * 'entities/form/ui' // Fail
           * 'entities/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow slices with structure grouping
           * @example
           * 'features/auth/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow not segments import in shared segments
           * @example
           * 'shared/ui/button' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow import from segments in shared
           * @example
           * 'shared/ui' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})`,

          /** allow global modules */
          `**/node_modules/**`,

          /**
           * allow custom shared segments with _prefix
           */
          `**/*shared/_*`,
          `**/*shared/_*/*`,
        ],
      },
    ],
  },
};
