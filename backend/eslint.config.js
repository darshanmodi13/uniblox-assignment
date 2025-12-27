import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				process: 'readonly',
				console: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'no-relative-import-paths': noRelativeImportPaths,
		},
		rules: {
			'no-console': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: false, rootDir: 'src', prefix: '~' }],
		},
	},
];
