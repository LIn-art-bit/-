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
