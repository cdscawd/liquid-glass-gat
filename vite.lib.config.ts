import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LiquidGlassUI',
      formats: ['es'],
      fileName: 'index',
    },
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'liquidglassui.css',
      },
    },
  },
})
