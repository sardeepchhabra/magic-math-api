import js from "@eslint/js";
import globals from "globals";

export default [
  // Base configuration for all JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module", // Default to ESM for .mjs files
    },
  },

  // CommonJS specific settings for .js and .cjs files
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // Add Node.js globals (replacing browser globals for a Node.js project)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Add recommended rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
