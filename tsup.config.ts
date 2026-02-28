import { defineConfig } from 'tsup'
import { copyFileSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react'],
  onSuccess: async () => {
    copyFileSync('src/styles.css', 'dist/styles.css')
  },
})
