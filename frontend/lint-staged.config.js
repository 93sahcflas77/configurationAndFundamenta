const config = {
    '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
    '*.css': ['stylelint --fix', 'prettier --write'],
    '*.{json,md,html,yml}': ['eslint --fix', 'prettier --write'],
}

export default config
