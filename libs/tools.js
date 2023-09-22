/**
 * 生成指定范围的随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} withDecimals 是否携带小数
 * @returns 生成的随机数
 */
function getRandomNum(min, max, withDecimals = false) {
  const number = Math.random() * (max - min + 1) + min
  return withDecimals ? number : Math.floor(number)
}

/**
 * 获取随机颜色
 * @returns 生成的随机颜色
 */
function getRandomColor() {
  return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}, ${getRandomNum(0, 255)})`
}

/**
 * 生成随机字符
 * @returns 生成的随机字符
 */
function getRandomChar() {
  return String.fromCharCode(getRandomNum(0x30a0, 0x30ff))
}

window._ = { getRandomNum, getRandomColor, getRandomChar }