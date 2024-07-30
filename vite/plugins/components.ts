import components from 'unplugin-vue-components/vite'
import { VarletImportResolver } from '@varlet/import-resolver'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export function createComponents() {
  return components({
    dirs: ['src/ui/components'],
    resolvers: [VarletImportResolver(), TDesignResolver({ library: 'vue-next' })],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
  })
}
