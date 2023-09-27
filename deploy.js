const fs = require('fs')

const run = () => {
  const dirList = fs.readdirSync(__dirname)
  const ul = dirList.filter(dir => /^\d(.*)?$/.test(dir)).sort((a, b) => {
    const reg = /^\d+(?=\.)?/
    const aNum = parseInt(a.match(reg)[0])
    const bNum = parseInt(b.match(reg)[0])
    return aNum - bNum
  }).map(dir => `<li><a href="${dir}">${dir}</a></li>`).join('')
  const html = `
  <html><head><title>目录列表</title><style>ul{list-style: none;padding: 0;}li{width: auto;margin: 16px 0;text-align: center;border-radius: 5px;border: 1px solid #eee;transition: .3s;}li:hover{background: #eee;}a{display: block;padding: 10px;text-decoration: none;color: #333;}</style></head><body><ul>${ul}</ul></body></html>`
  fs.writeFileSync('index.html', html)
}

run()