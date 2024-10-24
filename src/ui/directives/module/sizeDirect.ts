/**
 * 每个观察的元素对象和其所对应的回调函数都是一一对应的关系，用map来存储这种关系
 * 但是为了防止内存泄漏，需要在元素对象被销毁时，将其对应的回调函数也销毁，故使用weakMap；WeakMap 的键必须是可被垃圾回收的。
 */
const map = new WeakMap()

/**
 *  全局创建一个观察者对象，每当观察的元素对象发生变化时，观察者对象都会触发回调函数
 *   观察的元素对象可以是多个，所以回调函数传入的参数是一个数组，数组中的每一项都是一个对象，对象中包含了观察的元素对象和其所对应的回调函数
 */
const ob = new ResizeObserver((entries) => {
  console.log('entries', entries)
  for (const entry of entries)
    console.log('entry', entry)
    /** do something...... */
    // const handler = map.get(entry.target)
    // handler && handler({
    //   width: entry.borderBoxSize[0].inlineSize,
    //   height: entry.borderBoxSize[0].blockSize
    // })

  // 这就是实现了resize指令的核心逻辑，当观察的元素对象发生变化时，触发回调函数，回调函数传入的参数是元素对象的宽高
})

export default {
  // 参数问题可查询官网文档https://cn.vuejs.org/guide/reusability/custom-directives.html
  mounted(el: HTMLElement, binding: any) {
    console.log('元素挂载了-------------------')
    /** do something...... */
    console.log('binding', binding)
    map.set(el, binding)
    // console.log(map)
    ob.observe(el, binding)
  },
  onUnmounted(el: HTMLElement) {
    console.log('元素销毁了-------------------')
    ob.unobserve(el)
  },
}
