import tseslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import { fileURLToPath } from 'url'

export default tseslint.config({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  settings: { 
    react: { 
      version: '18.2'  // 使用你项目中的 React 版本
    } 
  },
  plugins: {
    '@typescript-eslint': tseslint,
    react,
  },
  rules: {
    ...tseslint.configs.recommendedTypeChecked.rules,
    ...tseslint.configs.stylisticTypeChecked.rules,
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
