import type { App } from 'vue'
import { defineComponent, ref } from 'vue'
import loading from './Loading.vue'

// MountLoading.ts

export class MountLoading {
  private static instance: MountLoading
  private loadingComponent: any
  private loadingInstance: App | null = null

  private constructor() {
    this.loadingComponent = loading
  }

  // 单例模式
  static getInstance() {
    if (!MountLoading.instance)
      MountLoading.instance = new MountLoading()

    return MountLoading.instance
  }

  mountLoading() {
    if (!this.loadingInstance) {
      const loadingContainer = document.createElement('div')
      document.body.appendChild(loadingContainer)

      this.loadingInstance = defineComponent({
        template: '<div ref="loadingContainer"></div>',
        setup() {
          const loadingContainerRef = ref(null)
          return {
            loadingContainerRef,
          }
        },
        mounted() {
          const LoadingComponentConstructor = defineComponent(this.$parent.loadingComponent)
          this.$parent.loadingInstance = createApp(LoadingComponentConstructor).mount(this.loadingContainerRef)
        },
      })

      createApp(this.loadingInstance).mount(loadingContainer)
      console.log('loading')
    }
  }

  unmountLoading() {
    if (this.loadingInstance) {
      this.loadingInstance.unmount() // 销毁 Loading 实例
      this.loadingInstance = null
      console.log('unloading')
    }
  }

  // 销毁 MountLoading 实例
  destroy() {
    this.unmountLoading() // 移除加载组件
    MountLoading.instance = null // 清空实例引用
  }
}
