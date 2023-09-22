'use strict'

class ColorCard {
  _cardList = []
  constructor(selector, maxCount = 500) {
    this._selector = selector
    this._maxCount = maxCount
  }
  init() {
    this.elWrapperBox = document.querySelector(this._selector)
    if(!this.elWrapperBox) throw new Error('挂载目标未找到, 请检查!')
    this._elCanvas = document.createElement('canvas')
    const { width, height } = this.elWrapperBox.getBoundingClientRect()
    this._elCanvas.width = width * devicePixelRatio
    this._elCanvas.height = height * devicePixelRatio
    this._elCanvas.setAttribute('style', 'position: absolute; top: 0; left: 0; background-color: #000; z-index: -1;')
    this.elWrapperBox.appendChild(this._elCanvas)
    window.addEventListener('resize', this.onResize.bind(this))
    this._ctx = this._elCanvas.getContext('2d')
    this.draw()
  }
  draw() {
    // 生成几率: (最大数量 - 当前数量) / 最大数量
    const generateRate = (this._maxCount - this._cardList.length) / this._maxCount
    this._ctx.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height)
    const x = _.getRandomNum(0, this._elCanvas.width)
    const y = _.getRandomNum(0, 100)
    const width = _.getRandomNum(5, 12)
    const height = _.getRandomNum(12, 24)
    if (generateRate > Math.random()) {
      this._cardList.push(new Card(x, y, width, height, _.getRandomColor(), _.getRandomNum(3, 4), _.getRandomNum(0, 360)))
    }
    this._cardList.forEach((card, index) => {
      card.y += card.speed
      if (card.y > this._elCanvas.height) {
        this._cardList.splice(index, 1)
      } else {
        card.draw(this._ctx)
      }
    })
    requestAnimationFrame(this.draw.bind(this))
  }
  onResize() {
    const { width, height } = this.elWrapperBox.getBoundingClientRect()
    this._elCanvas.width = width * devicePixelRatio
    this._elCanvas.height = height * devicePixelRatio
  }
}

class Card {
  constructor(x, y, width, height, color, speed, angle) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.speed = speed
    this.angle = angle
  }
  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}