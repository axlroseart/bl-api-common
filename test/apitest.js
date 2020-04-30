const apiConfig = require('../api.config.mjs')
const CommonApi = require('../index')

let instance = new CommonApi(apiConfig, 'https://ts-api.luckyins.com')

instance.homeBanner({}, {
  channel: 'channel_test',
  info_id: '37'
}).then(data => {
  console.log('==> 接口正常返回数据：', data)
}).catch(error => {
  console.log('==> 接口返回错误数据：', error)
})
