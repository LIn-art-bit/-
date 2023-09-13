import Mock from 'mockjs'

// 延时时间
Mock.setup({
  timeout: '300-600'
})

// 登录验证
Mock.mock(RegExp('mock/test/login'), 'post', (options) => {
  const data = JSON.parse(options.body)
  if (data.username === 'admin' && data.password === '12345678') {
    return Mock.mock({
      "code": 200,
      "token": "@guid()",
      "isOk": true,
      "msg": "登陆成功",
      "statusCode": "200"
    });
  } else if (data.username === 'admin' && data.password != '12345678') {
    return Mock.mock({
      "code": 400,
      "token": null,
      "isOk": false,
      "msg": "密码错误",
      "statusCode": null
    });
  } else if (data.username != 'admin') {
    return Mock.mock({
      'code': 500,
      "token": null,
      "isOk": false,
      "msg": "账号不存在",
      "statusCode": null
    });
  }
})

// 首页数据
const Random = Mock.Random;

// 使用 Mock.js 来生成随机数据
const initData = Mock.mock([
  {
    type: '新增用户',
    value: Random.integer(50, 200),
  },
  {
    type: '累计访问',
    value: Random.integer(100, 1000),
  },
  {
    type: '新增问答',
    value: Random.integer(10, 50),
  },
  {
    type: '分享统计',
    value: Random.integer(5, 20),
  },
]
)

const pieChartData = Mock.mock([
  {
    name: '直接访问',
    value: Random.integer(100, 1000),
  },
  {
    name: '邮件营销',
    value: Random.integer(50, 500),
  },
  {
    name: '联盟广告',
    value: Random.integer(200, 800),
  },
  {
    name: '视频广告',
    value: Random.integer(150, 700),
  },
  {
    name: '搜索引擎',
    value: Random.integer(300, 1200),
  },
])

const trendChartData = Mock.mock({
  'date': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  'value': [Random.integer(100, 300), Random.integer(100, 400), Random.integer(100, 500), Random.integer(100, 600), Random.integer(100, 600), Random.integer(300, 1000), Random.integer(300, 1000)],
});

Mock.mock('mock/test/home/initData', 'get', () => {
  return {
    "code": 200,
    "isOk": true,
    data: initData,
    "msg": "数据请求成功",
    "statusCode": "200"
  }
})

Mock.mock('mock/test/home/pieChartData', 'get', () => {
  return {
    "code": 200,
    "isOk": true,
    data: pieChartData,
    "msg": "数据请求成功",
    "statusCode": "200"
  }
})

Mock.mock('mock/test/home/trendChartData', 'get', () => {
  return {
    "code": 200,
    "isOk": true,
    data: trendChartData,
    "msg": "数据请求成功",
    "statusCode": "200"
  }
})