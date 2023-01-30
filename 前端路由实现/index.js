const mainEl = document.querySelector('.main-wrapper')
window.Router = new Routers()

const updatePage = function(pageContent){
  mainEl.innerHTML = pageContent
}

Router.route('/', () => updatePage('<article style="background-color: skyblue">首页内容</article>'))

Router.route('/explore', () => updatePage('<article style="background-color: pink">探索页内容</article>'))

Router.route('/mine', () => updatePage('<article style="background-color: orange">我的页面内容</article>'))