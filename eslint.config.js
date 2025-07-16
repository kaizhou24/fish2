import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script",
            globals: {
                console: "readonly"
            }
        },
        rules: {
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"]
        }
    }
];