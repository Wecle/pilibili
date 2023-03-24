// see https://zhuanlan.zhihu.com/p/62401626
// module.exports = {
//     parser: "@typescript-eslint/parser", // 解析器
//     extends: [
//         "plugin:@typescript-eslint/recommended",
//         "react-app",
//     ], // 继承的规则 [扩展]
//     plugins: ["@typescript-eslint", "react"], // 插件
//     rules: {
//         "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
//         "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
//         "@typescript-eslint/ban-types": 0,
//         "@typescript-eslint/no-empty-interface": 0,
//         "@typescript-eslint/no-var-requires": 0,
//         "@typescript-eslint/member-delimiter-style": 0,
//         "@typescript-eslint/explicit-module-boundary-types": 0,
//         "@typescript-eslint/interface-name-prefix": 0,
//         "@typescript-eslint/camelcase": 0,
//         "@typescript-eslint/explicit-function-return-type": 0
//     }, // 规则
// };
// import { defineConfig } from 'eslint-define-config'

module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true, // 启用jsx
        },
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "react-app",
        'plugin:react/jsx-runtime',
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        'react/react-in-jsx-scope': 'off'
    },
}
