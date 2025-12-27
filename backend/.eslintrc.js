module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-unused-vars': ['warn'],
		'no-console': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
	},
	env: {
		node: true,
		es6: true,
	},
};
