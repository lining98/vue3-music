/* 通用函数 */
// 节流
export function throttle(func: (...args: any[]) => void, delay: number) {
  let prevTime = 0;
  return function (...args: any[]) {
    const currTime = Date.now();
    if (currTime - prevTime >= delay) {
      func.apply(this, args);
      prevTime = currTime;
    }
  };
}


// 防抖
export function debounce(func: Function, delay: number) {
  let timer: number | null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer as number);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
