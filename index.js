/**
 * 保联科技 - 通用API处理类库
 * v1.0.0
 * 2020-04-17
 * created by Ryan
 */

require('es6-promise').polyfill()
require('isomorphic-fetch')

class CommonApi {

  constructor(apiConfig = {}, apiUrl = '') {

    // 定义默认配置对象
    this.options = {
      // 超时时间设置
      OVER_TIME: 80000,
      // 请求头配置
      headers: {},
      // 请求体类型映射
      contentTypeMap: {
        'url': 'application/json',
        'json': 'application/json',
        'mix': 'application/json',
        'form': 'application/x-www-form-urlencoded',
        'route': 'application/x-www-form-urlencoded'
      },
      // 错误提示
      ERR_TIP: {
        LOGIN_ERR: '登录状态已过期，请重新登录',
        SERVER_ERR: '服务内部错误',
        TIME_OUT: '数据请求超时，请稍后再试'
      }
    }

    // API配置结构体
    this.apiConfig = apiConfig
    // 服务地址（app）
    this.apiUrl = apiUrl
    // 初始化，生成API处理函数
    this._apiGenerator()

  }

  // API处理过程逻辑工厂函数
  _apiGenerator() {
    let self = this
    // API方法名
    const apiNameList = Object.keys(this.apiConfig)
    apiNameList.forEach(element => {
      const config = this.apiConfig[element]
      // 重写请求URL
      config.url = this.apiUrl + config.url
      let realConfig = this._objCopy(config)
      // console.log('==> 拷贝出来的对象：', realConfig)
      // 根据API配置文件生成每个API请求方法
      self[element] = async function(data, extra) {
        // 处理请求参数
        self._getParams(config, data, extra, realConfig)
        // console.log('==> 处理过后的API配置的对象数据：', realConfig)
        let res_1, res_2, finalData
        // 处理过程第一步：发起fetch请求，返回请求结果
        res_1 = await self._fetchResult(realConfig)
        // console.log('==> fetch result:', res_1)
        // 处理过程第二步：对fetch接口状态进行处理
        res_2 = await self._fetchStatusFilter(res_1)
        // 处理过程第三步：对接口返回的数据体进行过滤
        finalData = await self._resDataFilter(res_2)
        
        return finalData
      }
    })
  }

  /**
   * 参数处理过程（URL query string / json对象 / 混合）
   * @param {Object} config API模版配置数据
   * @param {Object} data 向接口传递的参数对象(url query)
   * @param {Object} extra 向接口传递的参数对象(json对象)
   */
  _getParams(config, data, extra, realConfig) {
    let type = config.type
    let params = Object.assign(config.params || {}, data)
    switch (type) {
      // form表单提交
      case 'form':
        // console.log('==> fetch type:', 'form')
        realConfig.params = this._serialize(params)
        break
      // url query string
      case 'url':
        // console.log('==> fetch type:', 'url')
        realConfig.url = config.url + '?' + this._serialize(params)
        realConfig.params = null
        break
      // json对象提交
      case 'json':
        // console.log('==> fetch type:', 'json')
        realConfig.params = JSON.stringify(params, null, 2)
        break
      // 路由传参
      case 'route':
        // console.log('==> fetch type:', 'route')
        realConfig.url = config.url + '/' + data.route.join('/')
        realConfig.params = this._serialize(Object.assign(realConfig.params, extra))
        break
      // 混合模式（URL query string 和 json）
      case 'mix':
        // console.log('==> fetch type:', 'mix')
        realConfig.url = config.url + '?' + this._serialize(params)
        realConfig.params = JSON.stringify(extra, null, 2)
        break
    }
  }

  /**
   * 接口状态过滤
   * @param {Object} response fetch返回的数据结构体
   */
  _fetchStatusFilter(response) {
    let error
    const { ERR_TIP } = this.options
    const loginTip = ERR_TIP.LOGIN_ERR
    const serverErrTip = ERR_TIP.SERVER_ERR
    if (response.status === 401) {
      error = new Error(loginTip)
      error.code = 401
      throw error
    }
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw {
        code: response.status,
        message: response.statusText === '' ? serverErrTip : response.statusText
      }
    }
  }

  /**
   * 对请求返回的数据进行过滤，得到最终结果
   * @param {Object} data 接口正常返回的数据
   */
  _resDataFilter(res) {
    // console.log('==> response data:', res)
    const status = (res.code === 1 && typeof res !== 'undefined') || res.status
    // console.log('==> response info:', status)
    if (!status) {
      // console.log('==> response error info:', status)
      const errCode = res.code
      const errMsg = res.error ? res.error.message : res.msg
      throw {
        code: errCode,
        message: errMsg
      }
    }
    return res.data
  }

  // 获取token
  _token() {
    if (typeof window !== 'undefined')
    return window.localStorage.getItem('token')
  }

  /**
   * fetch处理结果
   * @param {Object} config API模版配置数据
   */
  _fetchResult(config) {
    return Promise.race([this._fetchPromise(config), this._fetchTimeoutPromise()])
  }

  /**
   * 具体请求过程
   * @param {Object} config API模版配置数据
   */
  _fetchPromise(config) {
    // console.log('==> fetch promise:', config.url)
    const { contentTypeMap } = this.options
    const contentType = contentTypeMap[config.type]
    let header = {
      'Content-Type': contentType,
      // 无缓存配置
      'pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    }
    const token = this._token()
    // console.log('==> token:', token)
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }
    // console.log('==> req header:', header)
    return fetch(config.url, {
      // 请求方法
      method: config.method,
      // 请求头配置
      headers: header,
      // 请求参数体
      body: config.params,
      // 发送带凭据的请求
      // credentials: ''
    })
  }

  // 接口超时处理
  _fetchTimeoutPromise() {
    let self = this
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        reject({
          message: self.options.ERR_TIP.TIME_OUT
        })
      }, self.options.OVER_TIME)
    })
  }

  /**
   * 参数序列化方法
   * @param {Object} data 参数对象
   */
  _serialize(data) {
    let ret = []
    for (let key in data) {
      ret.push(`${key}=${data[key]}`)
    }
  
    return ret.join('&')
  }

  /**
   * 对象拷贝
   * @param {object} data 要拷贝的对象
   */
  _objCopy(data) {
    const obj = {}
    for (const key in data) {
      obj[key] = data[key]
    }
    return obj
  }

}

module.exports = CommonApi