class FlappyBird {
  constructor(selector) {
    this._canvasEl = document.querySelector(selector)
    this._ctx = this._canvasEl.getContext('2d')
    this._initPannel()
  }
  /** 初始化游戏面板 */
  _initPannel() {
    this._canvasEl.width = 600
    this._canvasEl.height = 400
  }
}