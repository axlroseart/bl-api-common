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
  // 首页banner图
  homeBanner: {
    url: '/v1/product-center/getBanner',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 客户列表
  clientInterface: {
    url: '/v1/membership/customer/customers',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 客户详情
  clientDescribe: {
    url: '/v1/membership/customer/customer',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 添加客户、修改用户信息
  addClient: {
    url: '/v1/membership/customer/customer',
    method: 'POST',
    type: 'mix',
    params: {},
    extra: {}
  },
  // 删除客户
  deleteClient: {
    url: '/v1/membership/customer/delete_customer',
    method: 'POST',
    type: 'mix',
    params: {},
    extra: {}
  },
  // 保险公司下的 - 所有险种信息
  fetchAllInsureList: {
    url: '/api/api/invoke',
    method: 'POST',
    type: 'mix',
    params: {
      view: 'true',
      server: 'PolicyIns.getProductList',
      device: 'mobile'
    },
    extra: {}
  },
  //验证码登录
  verifyLogin: {
    url: '/v1/sms-verify',
    method: 'POST',
    type: 'route',
    params: {}
  },

  // 产品库接口
  fetchCurrProductData: {
    url: '/v1/product-center/products',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 获取token
  fetchToken: {
    url: '/api/token',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 获取单个产品的详细数据
  fetchSingleProductData: {
    url: '/v1/product-center/product-detail',
    method: 'GET',
    type: 'url',
    params: {}
  },
  // 利益演示表
  fetchInterestData: {
    url: '/v1/proposal/create',
    method: 'POST',
    type: 'json',
    params: {}
  },
  //团队信息
  getTeamInfo: {
    url: '/v1/membership/team/info',
    method: 'GET',
    TYPE: 'json',
    params: {}
  },
  //团队成员列表
  getTeamMembers: {
    url: '/v1/membership/team/members',
    method: 'GET',
    params: {}
  },
  //团队考勤
  getTeamAttends: {
    url: '/v1/membership/team/attends',
    method: 'GET',
    params: {}
  },
  //团队计划书
  getTeamSchedule: {
    url: '/v1/membership/team/plans',
    method: 'get',
    params: {}
  },
  //团队业绩
  getTeamScores: {
    url: '/v1/membership/team/scores',
    method: 'GET',
    params: {}
  },
  //注册/修改密码 验证码接口
  getRegisterCode: {
    url: '/v1/membership/agent/sms',
    method: 'POST',
    type: 'form',
    params: {}
  },
  //确认提交修改密码
  confirmPassWord: {
    url: '/v1/membership/agent/passwd',
    method: 'POST',
    type: 'form',
    params: {}
  },
  //确认提交修改密码
  register: {
    url: '/v1/membership/agent/register',
    method: 'POST',
    type: 'form',
    params: {}
  }
}

module.exports = apiConfig