export default class LazyLoad {
  constructor(elArr, options = {}){
    this.elArr = elArr
    this.options = options
  }

  init(){
    this.observer = new IntersectionObserver(changes => {
      changes.forEach(change => {
        const target = change.target
        if(change.intersectionRatio > 0){
          this.observer.unobserve(target)
          target.setAttribute('src', target.dataset.src || '')
          target.removeAttribute('data-src')
        }
      })
    }, this.options)
    this.elArr.forEach(el => this.observer.observe(el))
  }
}