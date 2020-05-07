const apiConfig = require('./api.config.mjs')
const CommonApi = require('../index')

let instance = new CommonApi(apiConfig, 'https://ts-www.luckyins.com/')

instance.fetchBasicData({}, {}).then(data => {
  console.log('==> 接口正常返回数据：', data)
}).catch(error => {
  console.log('==> 接口返回错误数据：', error)
})
