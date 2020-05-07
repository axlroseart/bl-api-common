/**
 * API业务参数对象，属性名对应mutations
 * url: 接口地址
 * method: 请求类型
 * type: json（参数为json格式对象）, form（参数为form表单对象）, url（参数为字符串拼接）, mix（参数为混合型数据结构）
 * params: 默认请求参数对象
 * extra: 混合模式下的参数类型
 */
const apiConfig = {
  // 登录
  doLogin: {
    url: '/v1/user-verify',
    method: 'POST',
    type: 'form',
    params: {},
    extra: {}
  },
  // 所有保险公司数据
  fetchAllCompany: {
    url: '/v1/product-center/companys',
    method: 'GET',
    type: 'url',
    params: {}
  },
  //验证码登录
  verifyLogin: {
    url: '/v1/sms-verify',
    method: 'POST',
    type: 'route',
    params: {}
  },
  // 在线投保基础资料接口
  fetchBasicData: {
    url: '/api/api/invoke',
    method: 'POST',
    type: 'mix',
    params: {
      view: 'true',
      server: 'PolicyIns.initPolicyField',
      device: 'mobile'
    },
    extra: {
    }
  }
}

module.exports = apiConfig