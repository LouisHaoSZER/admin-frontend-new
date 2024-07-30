import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd())
  return {
    plugins: [createVitePlugins()],
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
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`,
      ],
    },
  }
})
