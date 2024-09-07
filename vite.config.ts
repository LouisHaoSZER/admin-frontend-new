import path from 'node:path'
import process from 'node:process'
import type { UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig((configEnv): UserConfig => {
  const env: Record<string, string> = loadEnv(configEnv.mode, process.cwd())
  return {
    plugins: [createVitePlugins()],
    assetsInclude: ['src/assets/**/*.splinecode'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      open: true,
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: configEnv.command === 'serve' && env.VITE_OPEN_PROXY === 'true',
          rewrite: path => path.replace(/\/proxy/, ''),
        },
      },
    },
  }
})
