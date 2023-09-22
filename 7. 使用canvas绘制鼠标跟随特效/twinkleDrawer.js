'use strict'

class TwinkleDrawer {
  _currPosition = { x: 0, y: 0 }
  _ballList = [];
  /**
   * 鼠标滑过时下坠小球特效
   * @param {*} selector 要应用特效的元素选择器
   * @param {*} onceCount 每次生成的小球数量
   * @param {*} bindOnCanvas 事件绑定目标是否为canvas, 为false时绑定到selector元素上
   */
  constructor(selector, onceCount = 1, bindOnCanvas = false) {
    this._bindOnCanvas = bindOnCanvas;
    this._onceCount = onceCount;
    if(onceCount > 10) console.warn('小球一次性生成的数量太多, 可能会影响性能, 请注意...')
    this._elCanvasBox = document.querySelector(selector);
    if(!this._elCanvasBox) throw new Error('找不到挂载目标, 请检查!');
    this._elCanvas = document.createElement('canvas');
    this._elCanvas.setAttribute('style', 'position: absolute; top: 0; left: 0; background-color: #000; z-index: -1;');
    const { width, height } = this._elCanvasBox.getBoundingClientRect();
    this._elCanvas.width = width * window.devicePixelRatio;
    this._elCanvas.height = height * window.devicePixelRatio;
    this._elCanvasBox.appendChild(this._elCanvas);
  }
  /** 初始化画布, 并绑定各个事件 */
  init() {
    this._ctx = this._elCanvas.getContext('2d');
    const listenTarget = this._bindOnCanvas ? this._elCanvas : this._elCanvasBox;
    listenTarget.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    listenTarget.addEventListener('mousemove', this.onMouseMove.bind(this));
    listenTarget.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }
  /** 小球绘制函数 */
  draw() {
    // 鼠标在画布内时, 增加小球
    if(this._canDraw) {
      for(let i = 0; i < this._onceCount; i++) {
        const x = this._currPosition.x + Math.random() * 14;
        const y = this._currPosition.y + Math.random() * 14;
        const speed = Math.random() + 2;
        this._ballList.push(new Ball(x, y, Math.random(), speed))
      }
    }
    // 当小球都没了的时候, 终止动画
    if(!this._ballList.length) return this.stopAnimate();
    this._ctx.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
    this._ballList.forEach((ball, index) => {
      if(ball.y < this._elCanvas.height) {
        ball.draw(this._ctx)
      } else {
        this._ballList.splice(index, 1)
      }
    })
    this._animateId = requestAnimationFrame(this.draw.bind(this));
  }
  stopAnimate() {
    cancelAnimationFrame(this._animateId);
    this._animateId = null;
    this._ballList = [];
  }
  /**
   * 鼠标进入时, 允许动画添加新的小球, 并初步记录当前鼠标位置
   * 若当前没有动画, 则开始动画
   * @param {*} e 事件参数
   */
  onMouseEnter(e) {
    this._canDraw = true;
    this._currPosition = { x: e.clientX, y: e.clientY };
    if(!this._animateId) this.draw()
  }
  onMouseMove(e) { this._currPosition = { x: e.clientX, y: e.clientY } }
  onMouseLeave() { this._canDraw = false }
  onResize() {
    const { width, height } = this._elCanvasBox.getBoundingClientRect();
    this._elCanvas.width = width * window.devicePixelRatio;
    this._elCanvas.height = height * window.devicePixelRatio;
  }
}

class Ball {
  constructor(x, y, opacity, speed) {
    this.x = x
    this.y = y
    this.opacity = opacity
    this.speed = speed
  }
  draw(ctx) {
    this.y += this.speed
    ctx.beginPath()
    ctx.arc(this.x * window.devicePixelRatio, this.y * window.devicePixelRatio, 6, 0, 2 * Math.PI)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }
}