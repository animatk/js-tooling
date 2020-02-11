module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["error", "never"],
        // "indent": ["error", "tab"],
        // avoid someVar = n + x error if it is under parenthesis 
        "no-return-assign": ["error", "except-parens"],
        // enable JS files to contain JXS syntax
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};