// This babel config is required for Storybook to parse our stories as TypeScript.
// Read more: https://github.com/storybookjs/storybook/issues/22357

module.exports = {
    sourceType: "unambiguous",
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: 130,
                },
            },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    plugins: [],
};