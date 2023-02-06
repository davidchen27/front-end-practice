class Routers {
  constructor(){
    this.routes = {}
    this.currentRoute = ''
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, true)
    window.addEventListener('hashchange', this.refresh, true)
  }
  route(path, callback){
    this.routes[path] = callback || function(){}
  }
  refresh(){
    this.currentRoute = location.hash.slice(1) || '/'
    if(this.routes[this.currentRoute]) this.routes[this.currentRoute]()
  }
}