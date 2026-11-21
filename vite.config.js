import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig(({ mode }) => {
  const plugins = [react()]

  if (mode === 'singlefile') {
    plugins.push(viteSingleFile({
      removeViteModuleLoader: true
    }))
  }

  return {
    plugins,
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssCodeSplit: mode !== 'singlefile',
      assetsInlineLimit: mode === 'singlefile' ? 100000000 : 4096,
    }
  }
})