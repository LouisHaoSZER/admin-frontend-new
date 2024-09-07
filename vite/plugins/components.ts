import components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export function createComponents() {
  return components({
    dirs: ['src/ui/components'],
    resolvers: [TDesignResolver({ library: 'vue-next' })],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
  })
}
