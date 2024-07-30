import layouts from 'vite-plugin-vue-layouts'

export function createLayouts() {
  return layouts({
    layoutsDirs: './src/ui/layouts',
    defaultLayout: 'index',
  })
}
