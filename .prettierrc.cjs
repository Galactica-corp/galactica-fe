/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  semi: true,
  endOfLine: "auto",
  importOrder: [
    "^react.*$",
    "<THIRD_PARTY_MODULES>",
    "^app/(.*)$",
    "^entity/(.*)$",
    "^features/(.*)$",
    "^widgets/(.*)$",
    "^pages/(.*)$",
    "^shared/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
