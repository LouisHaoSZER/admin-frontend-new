/**
 * @description 重置状态
 * @param {Function} valueFn 获取状态值函数
 * @param {Function} callback 回调函数
 */

// 非空对象
// type NonNUllObject<T> = T extends object ? (null extends T ? never : T) : never

// 默认深拷贝
function defaultClone(value: any) {
  if (typeof value !== 'object' || value === null)
    return value
  return JSON.parse(JSON.stringify(value))
}

export const useResettableRef = <T>(value: T, clone = defaultClone) => {
  const initialValue = clone(value)
  const state = ref(value)
  const reset = () => {
    state.value = clone(initialValue)
    // callback()
  }
  return { state, reset }
}
