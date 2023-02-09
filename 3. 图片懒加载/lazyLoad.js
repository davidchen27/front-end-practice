export default class LazyLoad {
  constructor(elArr){
    this.elArr = elArr
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
    })
    this.elArr.forEach(el => this.observer.observe(el))
  }
}