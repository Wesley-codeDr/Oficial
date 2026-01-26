import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/.vercel/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
    ],
  },

  // Base JavaScript config
  js.configs.recommended,

  // TypeScript and React files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
        NodeJS: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // Browser APIs
        File: 'readonly',
        Blob: 'readonly',
        FormData: 'readonly',
        FileReader: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        fetch: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        Storage: 'readonly',
        // DOM globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        confirm: 'readonly',
        Location: 'readonly',
        Navigator: 'readonly',
        MediaQueryListEvent: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLSpanElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLElement: 'readonly',
        KeyboardEvent: 'readonly',
        SVGSVGElement: 'readonly',
        require: 'readonly',
        module: 'readonly',
        // Project-specific globals
        cn: 'readonly',
        NewChatButton: 'readonly',
        GlassMaterialVariant: 'readonly',
        HealthcareVariant: 'readonly',
        SVGSVGElement: 'readonly',
        SVGCircleElement: 'readonly',
        SVGRectElement: 'readonly',
        SVGSVGElement: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Console rules
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'log', 'info'],
        },
      ],

      // General JavaScript rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-useless-escape': 'off',

      // TypeScript rules (using recommended)
      ...typescriptEslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
