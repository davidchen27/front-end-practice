/**
 * 生成指定范围的随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} withDecimals 是否携带小数
 * @returns 生成的随机数
 */
function getRandomNum(min, max, withDecimals = false) {
  const number = Math.random() * (max - min + 1) + min;
  return withDecimals ? number : Math.floor(number);
}

/**
 * 获取随机颜色
 * @returns 生成的随机颜色
 */
function getRandomColor() {
  return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}, ${getRandomNum(0, 255)})`;
}

/**
 * 生成随机字符
 * @returns 生成的随机字符
 */
function getRandomChar() {
  return String.fromCharCode(getRandomNum(0x30a0, 0x30ff));
}

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 防抖的延迟时间
 * @param {boolean} immediate 是否立即执行
 * @returns 防抖后的函数
 */
function debounce(fn, delay = 500, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !timer) {
      timer = 10086;
      return fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

window._ = { getRandomNum, getRandomColor, getRandomChar, debounce };