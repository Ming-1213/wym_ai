// 节流函数
/**
 * 节流函数
 * @param {Function} fn 要节流的函数
 * @param {Number} interval 节流时间间隔，默认为300ms
*/
export function throttle(fn, interval = 300) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= interval) {
        last = now;
        fn(...args);
      }
    };
  }