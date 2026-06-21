import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base は GitHub Pages 公開時にリポジトリ名に合わせて調整してください。
export default defineConfig({
  base: './',
  plugins: [react()],
})
