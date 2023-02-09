import LazyLoad from './lazyLoad.js'
const imgEls = document.querySelectorAll('.img')

const lazyLoad = new LazyLoad(imgEls)
lazyLoad.init()