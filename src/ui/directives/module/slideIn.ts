const DISTANC = 100
const DURATION = 500

const wMap = new WeakMap()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 播放动画
      const animation = wMap.get(entry.target)
      if (animation !== undefined && animation !== null) {
        animation.play()
      }

      // 播放过后从观察器里面移除动画
      wMap.delete(entry.target)
    }
  })
})

const isBelowViewPort = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

export default {

  mounted(el: HTMLElement, bindings: any) {
    /**
     * params1: 关键帧
     * params2: 动画配置
     * return: 动画实例
     */
    console.log('传递的binding', bindings)
    if (!isBelowViewPort(el))
      return

    // 创建动画
    const Animation = el.animate(
      [
        {
          transform: `translateY(${DISTANC}px)`,
          opacity: 0.5,
        },
        {
          transform: 'translateY(0)',
          opacity: 1,
        },
      ],
      {
        duration: DURATION,
        easing: 'ease-in-out', // 动画速度曲线
        fill: 'forwards', // 动画结束后保持最后一帧
      },
    )
    // 刚开始进入的时候暂停动画
    Animation.pause()
    wMap.set(el, Animation)
    // 元素挂载的时候，开始观察
    observer.observe(el)
  },

  unmouned(el: HTMLElement) {
    // 元素销毁的时候，停止观察
    observer.unobserve(el)
  },
}
