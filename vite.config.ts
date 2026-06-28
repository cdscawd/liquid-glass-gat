import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

/** GitHub Pages project site base: https://<user>.github.io/<repo>/ */
function resolvePagesBase(): string {
  if (process.env.VITE_BASE) {
    const base = process.env.VITE_BASE
    return base.endsWith('/') ? base : `${base}/`
  }
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (repo) return `/${repo}/`
  return '/liquidglassui/'
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? resolvePagesBase() : '/',

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  }
})
