// 防抖函数
export const debounce = (fn: () => void, delay: number = 300) => {
    let timer:ReturnType<typeof setTimeout>|null = null
    return function (this:any) {
      clearTimeout(timer as NodeJS.Timeout)
      timer = setTimeout(() => {
        fn.call(this)
      }, delay)
    }  
}
// 节流函数
export const throttle = (fn: () => void, delay: number = 300) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this:any) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this)
        timer = null
      }, delay)
    }
  }
}
