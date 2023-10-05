import Mock from 'mockjs'


function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 月份从0开始，所以要加1
  const day = today.getDate();

  // 使用模板字符串将年、月、日拼接成指定格式
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

function generateRandomDate() {
  const startDate = new Date('2020-01-01');
  const endDate = new Date(); // 当前日期
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // 格式化为 "YYYY-MM-DD"
}

function parseQueryString(url: any) {
  const query = url.split('?')[1];
  if (!query) {
    return {};
  }
  return query.split('&').reduce((params: any, param: any) => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
    return params;
  }, {});
}

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

// 首页饼图数据
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

// 首页折线图数据
const trendChartData = Mock.mock({
  'date': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  'value': [Random.integer(100, 300), Random.integer(100, 400), Random.integer(100, 500), Random.integer(100, 600), Random.integer(100, 600), Random.integer(300, 1000), Random.integer(300, 1000)],
});

// 生成用户数据列表
const userData = Mock.mock({
  'list|500': [{
    'id|+1': 1,
    'username': '@word(5, 10)',
    'name': '@cname',
    'role': () => Mock.Random.integer(0, 2),
    'status': () => Mock.Random.integer(0, 1),
    'createTime': () => generateRandomDate()
  }],
});

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

// 模拟搜索用户接口
Mock.mock(RegExp('mock/test/people/searchUserList'), 'get', (options) => {
  const params = parseQueryString(options.url);

  const { pageSize, currentPage, id, username, name, status, role } = params;
  // 对 userData.list 进行搜索
  let filteredList = userData.list;

  // 根据条件过滤数据，只有在搜索条件非空时才进行过滤
  if (id) {
    filteredList = filteredList.filter((user: any) => user.id === Number(id));
  }

  if (username) {
    filteredList = filteredList.filter((user: any) => user.username === username);
  }

  if (name) {
    filteredList = filteredList.filter((user: any) => user.name === name);
  }

  if (status) {
    filteredList = filteredList.filter((user: any) => user.status === Number(status));
  }

  if (role) {
    filteredList = filteredList.filter((user: any) => user.role === Number(role));
  }
  // 计算总页数
  const total = filteredList.length;

  // 分页处理
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const pagedData = filteredList.slice(startIndex, endIndex);

  return {
    code: 200,
    success: true,
    message: '搜索用户列表成功',
    data: pagedData,
    total,
  };
});

// 删除人员数据
Mock.mock(RegExp('mock/test/people/deleteUser'), 'post', (options) => {
  const params = JSON.parse(options.body);
  const deleteIndex = userData.list.findIndex((item: any) => {
    return item.id === Number(params.id)
  })
  if (deleteIndex != -1) {
    userData.list.splice(deleteIndex, 1)
    return {
      code: 200,
      success: true,
      message: '用户删除成功'
    }
  }
})

//修改人员数据
Mock.mock(RegExp('mock/test/people/editUser'), 'post', (options) => {
  const params = JSON.parse(options.body)
  params.role = Number(params.role)
  params.status = Number(params.status)

  for (let i = 0; i < userData.list.length; i++) {
    if (userData.list[i].id === params.id) {
      for (let k in params) {
        userData.list[i][k] = params[k]
      }
    }
  }
  return {
    code: 200,
    success: true,
    message: '用户修改成功'
  }
})

// 添加人员数据
Mock.mock(RegExp('mock/test/people/addUser'), 'post', (options) => {
  const params = JSON.parse(options.body)
  console.log(params);

  userData.list.push(
    Mock.mock({
      id: userData.list[userData.list.length - 1].id + 1,
      username: params.username,
      name: params.name,
      role: Number(params.role),
      status: Number(params.status),
      createTime: getCurrentDate()
    })
  )
  return {
    code: 200,
    success: true,
    message: '用户添加成功'
  }
})