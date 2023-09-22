'use strict'

class CodeRain {
  constructor(selector, fontSize = 16) {
    this._selector = selector
    this._fontSize = fontSize
  }
  init() {
    this._elWrapperBox = document.querySelector(this._selector)
    if(!this._elWrapperBox) throw new Error('未找到挂载目标元素, 请检查!')
    this._elCanvas = document.createElement('canvas')
    const { width, height } = this._elWrapperBox.getBoundingClientRect()
    this._elCanvas.width = width * devicePixelRatio
    this._elCanvas.height = height * devicePixelRatio
    this._elCanvas.setAttribute('style', 'position: absolute; top: 0; left: 0;z-index: -1;')
    this._elWrapperBox.appendChild(this._elCanvas)
    window.addEventListener('resize', this.onResize.bind(this))
    this._ctx = this._elCanvas.getContext('2d')
    this._columnCount = Math.floor(this._elCanvas.width / this._fontSize)
    this._charPosition = new Array(this._columnCount).fill(0)
    this.draw()
  }
  draw() {
    this._ctx.fillStyle = 'rgba(255, 255, 255, .1)'
    this._ctx.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height)
    for(let i = 0; i < this._columnCount; i++) {
      const x = i * this._fontSize
      const y = (this._charPosition[i] + 1) * this._fontSize
      this._ctx.fillStyle = _.getRandomColor()
      this._ctx.fillText(_.getRandomChar(), x, y)
      if(y > this._elCanvas.height && Math.random() > 0.99) {
        this._charPosition[i] = 0
        // 清除当前列画布
        this._ctx.clearRect(x, 0, this._fontSize, this._elCanvas.height - this._fontSize)
      } else {
        this._charPosition[i]++
      }
    }
    requestAnimationFrame(this.draw.bind(this))
  }
  onResize() {
    const { width, height } = this._elWrapperBox.getBoundingClientRect()
    this._elCanvas.width = width * devicePixelRatio
    this._elCanvas.height = height * devicePixelRatio
    this._columnCount = Math.floor(this._elCanvas.width / this._fontSize)
    this._charPosition = new Array(this._columnCount).fill(0)
  }
}