import autoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      VueRouterAutoImports,
      'pinia',
    ],
    resolvers: [
      TDesignResolver({ library: 'vue-next' }),
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [],
  })
}
