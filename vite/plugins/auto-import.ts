import autoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { VarletImportResolver } from '@varlet/import-resolver'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      VueRouterAutoImports,
      'pinia',
    ],
    resolvers: [
      VarletImportResolver({ autoImport: true }),
      TDesignResolver({ library: 'vue-next' }),
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [],
  })
}
