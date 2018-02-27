/*
"off" === 0
"warn" === 1
"error" === 2
*/

module.exports = {
    // 解析器
    "parser": "babel-eslint",
    // 环境
    "env" :{
        "commonjs": true,
        "browser": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    // 插件
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    // 全局变量
    // new webpack.ProvidePlugin
    "globals": {
        "require": true,
        "process": true,
        "Symbol": true,
        "module": true,
        "Promise": true,
        "React": true
    },
    // 规则
    "rules": {
        // 可能的代码错误
        "no-cond-assign": 2,
        "no-console": 0,
        "no-constant-condition": [2, {"checkLoops": false}],
        "no-control-regex": 1,
        "no-debugger": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-empty": 2,
        "no-ex-assign": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-parens": [1, "functions"],
        "no-extra-semi": 1,
        "no-func-assign": 1,
        "no-inner-declarations": 1,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 1,
        "no-obj-calls": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 2,
        "no-unexpected-multiline": 2,
        "no-unreachable": 2,
        "no-unsafe-finally": 2,
        "use-isnan": 2,
        "valid-typeof": 2,


        // 代码优化
        "curly": 1,
        "dot-notation": 1,
        "no-caller": 1,
        "no-case-declarations": 1,
        "no-empty-function": 1,
        "no-empty-pattern": 2,
        "no-eval": 1,
        "no-extend-native": 1,
        "no-extra-bind": 2,
        "no-extra-label": 1,
        "no-fallthrough": 2,
        "no-implied-eval": 1,
        "no-lone-blocks": 1,
        "no-multi-spaces": 1,
        "no-multi-str": 1,
        "no-new-func": 1,
        "no-new-wrappers": 1,
        "no-octal": 2,
        "no-redeclare": 1,
        "no-self-assign": 1,
        "no-self-compare": 1,
        "no-sequences": 1,
        "no-throw-literal": 1,
        "no-unused-expressions": [1, {"allowShortCircuit": true, "allowTernary": true}],
        "no-unused-labels": 1,
        "no-useless-call": 2,
        "no-useless-concat": 1,
        "no-with": 1,
        "radix": 1,


        // 变量
        "no-delete-var": 1,
        "no-label-var": 1,
        "no-shadow-restricted-names": 1,
        "no-undef-init": 1,
        "no-undef": 1,
        "no-undefined": 1,
        "no-unused-vars": 2,


        // 代码格式
        "array-bracket-spacing": [1, "never"],
        "block-spacing": [1, "never"],
        "brace-style": [1, "1tbs", { "allowSingleLine": true }],
        "camelcase": 1,
        "comma-dangle": 1,
        "comma-spacing": 1,
        "comma-style": 1,
        "computed-property-spacing": 1,
        "no-spaced-func": 1,
        "indent": [1, 4, {"SwitchCase": 1}],
        "jsx-quotes": [1, "prefer-double"],
        "key-spacing": [1, {"beforeColon": false, "afterColon": true}],
        "keyword-spacing": 1,
        "lines-around-comment": 1,
        "new-cap": [1, {"newIsCap": true, "capIsNew": false, "newIsCapExceptions": ["events"], "properties": false }],
        "newline-after-var": 1,
        "newline-before-return": 1,
        "no-mixed-spaces-and-tabs": 1,
        "no-multiple-empty-lines": [1, { "max": 3, "maxEOF": 1 }],
        "no-new-object": 1,
        "no-trailing-spaces": 0,
        "no-unneeded-ternary": 1,
        "no-whitespace-before-property": 1,
        "object-curly-newline": 0,
        "object-curly-spacing": 1,
        "one-var-declaration-per-line": 1,
        "operator-linebreak": [1, "before"],
        "padded-blocks": [1, {"blocks": "never"}],
        "quote-props": [1, "as-needed"],
        "quotes": [1, "single", {"allowTemplateLiterals": true}],
        "semi-spacing": 1,
        "semi": 1,
        "space-before-blocks": 1,
        "space-before-function-paren": [1, { "anonymous": "always", "named": "never" }],
        "space-in-parens": [1, "never"],
        "space-infix-ops": 1,
        "space-unary-ops": 1,
        "spaced-comment": 1,


        // ES6
        "arrow-parens": 1,
        "arrow-spacing": 1,
        "constructor-super": 2,
        "no-class-assign": 1,
        "no-confusing-arrow": 1,
        "no-const-assign": 2,
        "no-dupe-class-members": 2,
        "no-duplicate-imports": 1,
        "no-new-symbol": 2,
        "no-this-before-super": 2,
        "no-useless-constructor": 1,
        "no-useless-rename": 2,
        "no-var": 0,
        "object-shorthand": 0,
        "prefer-const": 0,
        "require-yield": 2,
        "rest-spread-spacing": 1,
        "template-curly-spacing": 1,
        "yield-star-spacing": 1,

        // react
        "react/jsx-uses-vars": 2,
        "react/jsx-indent": 1,
        "react/jsx-no-undef": 2,
        "react/prop-types": 0,
        "react/jsx-key": 0,
        "react/no-find-dom-node": 0,
        "react/jsx-space-before-closing": [1, "always"]
    }
};
