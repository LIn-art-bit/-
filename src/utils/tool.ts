// 防抖函数
export const debounce = (fn: Function, delay: number = 300) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function(this: any) {
        clearTimeout(timer as ReturnType<typeof setTimeout>);
        timer = setTimeout(() => {
            fn.call(this);
        }, delay);
    };
};

// 节流函数
export const throttle = (fn: Function, delay: number = 300) => {
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
