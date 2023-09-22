import LazyLoad from '../3. 图片懒加载/lazyLoad.js'
const imgEls = document.querySelectorAll('.img')

const lazyLoad = new LazyLoad(imgEls, { root: document.querySelector('.img-box') })
lazyLoad.init()