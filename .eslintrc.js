module.exports = {
    "env": {
        "es2020": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "semi": ["error", "never"],
        "indent": ["error", 4],
        "no-irregular-whitespace": "error",
        "nonblock-statement-body-position": ["error", "below"],
        "curly": "error",
        "no-multi-spaces": "error",
        "brace-style": "error",
        "no-multiple-empty-lines": "error",
        "no-whitespace-before-property": "error",
        "object-curly-spacing": ["error", "always"],
        "template-curly-spacing": ["error", "never"],
        "no-var": "error",
        "arrow-body-style": ["error", "always"]
    }
}