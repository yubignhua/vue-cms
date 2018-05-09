/**
 * Created by yubh on 2018/3/21.
 */
// 使用 Mock
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
const BASEURl = 'http://biztest.chunyu.me';
/**
 * 设置延时时间
 */
Mock.setup({
  timeout: '200-500', // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});


var data = Mock.mock({
  'list|4': [{
    //'id|+1': 1,
    //'number|1-10': 7,
    // 英文姓名
    // 'name' :'@name',
    // // 颜色
    // 'color': '@color',
    // // 英文标题
    // 'title': '@title',
    // // 链接
    // 'url': '@url("http")',
    // // 邮箱
    // 'email': '@email',
    // // 图片
    // 'image': Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
    // // 时间
    // 'date': '@date("yyyy-MM-dd HH:mm:ss")',
    // 'date2': '@dateTime',
    // // 汉字
    // 'ctitle': '@ctitle(8)',
    // // 汉字姓名
    // 'canme': '@cname()',
    // // 地址
    // 'cadd': '@province' + '@city' + '@county',
    // // 手机号
    // 'phone': /^1[385][1-9]\d{8}/
    //固话
    // 'telphone':/^6[345][1-9]\d{2}/,
    //微信
    //'weixin':/^[a-z][385][1-5]\d{3}/,
    
  }]
});




// mock一组数据
const produceNewsData = function () {
  const articles = [];
  for (let i = 0; i < 100; i++) {
    const newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: `${Random.date()} ${Random.time()}`, // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  
  return {
    articles,
  };
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);











Mock.mock('/api/account', {
  'page|1-10': 10,
  'total_num|1-1000': 1000,
  'account_list|20': [{
    'index|+1': 1,
    'id|+1': 10000,
    nick_name: '@cname',
    wx_alias: '@name',
    'invite_num|0-1000': 1000,
    'status_text|1-5': 5,
    'is_blocked|1': true,
  }],
});

Mock.mock('/api/userInfoList', {
  'infoList|20':[
    {  'name': '@cname',
      'phone': /^1[385][1-9]\d{8}/,
      'type':'@ctitle',
      'remark':'@cparagraph',
      'weixinId|1-5':''
    }
  ],
  'allPage':100
});

Mock.mock('/api/userInfoList?pageNum=1', {
  'infoList|20':[
    {  'name': '@cname',
      'phone': /^1[385][1-9]\d{8}/,
      'type':'@ctitle',
      'remark':'@cparagraph',
      'weixinId|1-5':''
    }
  ]
});
Mock.mock('/api/userInfoList?pageNum=2', {
  'infoList|20':[
    {  'name': '@cname',
      'phone': /^1[385][1-9]\d{8}/,
      'type':'@ctitle',
      'remark':'@cparagraph',
      'weixinId|1-5':''
    }
  ]
});



Mock.mock(/\.json/,'post',function (option){
    console.log('option::::',option);
    return {
      'message':Random.boolean()
    }
});



Mock.mock('/cdm/user/search','post',function (option){
  console.log('option::::',option);
  return {
    'infoList':[
      {  'name': '于炳华',
        'phone': '18612452753',
        'type':'哈哈哈',
        'remark':"司法解释辅导老师李开复克里斯大反垄断萨芬",
        'weixinId':'1234'
      }
    ]
  }
});



const dataList = Mock.mock({
  'infoList|20':[
    {  'name': '@cname',
      'cellphone': /^1[385][1-9]\d{8}/,
      'achievement':'@ctitle',
      'hospital_name':'@ctitle',
      'service_type':'@ctitle',
      'title':'@ctitle',
      'clinic_name':'@ctitle',
      'education_background':'@ctitle',
      'good_at':'@ctitle',
      'hospital_discription':'@cparagraph',
      'hospital_level':'@ctitle',
      'image': Random.image('50x50', '#50B347', '#FFF', 'Mock.js'),
      'doctor_id|1-5':''
    },],
  'total_num|1-1000': 1000,
})


//医生列表
Mock.mock('/cdm/doctor/search','post',function (option){
  console.log('option::::',option);
  let body = JSON.parse(option.body);
  if(body.name || body.cellphone){
    return {
      'infoList':[
        {  'name': '于炳华',
          'phone': '18612452753',
          'type':'哈哈哈',
          'remark':"司法解释辅导老师李开复克里斯大反垄断萨芬",
          'weixinId':'1234'
        }
      ]
    }
  }else if(!body.name && !body.cellphone){
    return dataList
  }
 
});
//医助信息列表
const assList = Mock.mock({
  'assistant_list|20':[
    {  'name': '@cname',
      'cellphone': /^1[385][1-9]\d{8}/,
      'birthday':'@date("yyyy-MM-dd")',
      'sex':'男',
      'telphone':/^6[345][1-9]\d{2}/,
      'weixin':/^[a-z][385][1-5]\d{3}/,
      'assistant_id|+1': 1,
    },
  ],
  'total_num|1-1000': 1000,
});
Mock.mock(`${BASEURl}/cdm/assistant/search1`,'get',function (option){
  console.log('option::::',option);
  return assList
  
});


//代购买
const waipay = Mock.mock({
  'service_list|20':[
    {  'user_name': '@cname',
      'user_cellphone': /^1[385][1-9]\d{8}/,
      'goods_remarks':'@cparagraph'
      
    },
  ],
  'total_num|1-1000': 1000,
});

//服务中
const servering = Mock.mock({
  'service_list|20':[
    {  'user_name': '@cname',
      'user_cellphone': /^1[385][1-9]\d{8}/,
      'goods_remarks':'@cparagraph',
      'start_time':'@date("yyyy-MM-dd")',
      'end_time':'@date("yyyy-MM-dd")',
      'doctor_name':'@cname',
      'assistant_name':'@cname',
      'user_remarks':'@cparagraph',
    },
  ],
  'total_num|1-1000': 1000,
});

const userServer = Mock.mock({
  'service_list|20':[
    {  'user_name': '@cname',
      'user_cellphone': /^1[385][1-9]\d{8}/,
      'user_sex':'男',
      'user_age|1-1000':100,
      'start_time':'@date("yyyy-MM-dd")',
      'end_time':'@date("yyyy-MM-dd")',
      'doctor_name':'@cname',
      'assistant_name':'@cname',
      'user_remarks':'@cparagraph',
      'user_custorm_tags':'@ctitle',
      'user_id|1-1000':1,
    },
  ],
  'total_num|1-1000': 1000,
});

//待分配
const dis = Mock.mock({
  'service_list|20':[
    {  'user_name': '@cname',
      'user_cellphone': /^1[385][1-9]\d{8}/,
      'pay_time':'@date("yyyy-MM-dd")',
      'valid_period|+1':1,
      'goods_name':'@title',
    },
  ],
  'total_num|1-1000': 1000,
});

//服务结束
const  over = Mock.mock({
  'service_list|20':[
    {  'user_name': '@cname',
      'user_cellphone': /^1[385][1-9]\d{8}/,
      'goods_remarks':'@cparagraph'
      
    },
  ],
  'total_num|1-1000': 1000,
});

Mock.mock(`${BASEURl}/cdm/service/search`,'post',function (option){
  //console.log('option::::',option);
  let body = JSON.parse(option.body);
  if(body.service_status === 'closed'){
    return servering
  }
  if(body.service_status === 'init'){
    return waipay
  }
  if(body.service_status === 'assigned'){
    return servering
  }
  if(body.service_status === 'purchased'){
    return dis
  }
  if(body.service_status === undefined){
    return userServer
  }
});


//医生列表
Mock.mock(`${BASEURl}/api/doclist`,{
  'docList|20':['@cname'],
  'total_num|1-1000': 1000,
});

//获取权限
Mock.mock(`${BASEURl}/cdm/accounts/role`,{
  'role':['doctor'],
  'user_name':'于炳华',
});

//登录
Mock.mock(`${BASEURl}/cdm/accounts/pc/login`,'post',function (option){
  console.log('option::::',option);
  return {
    'user_name': '于炳华',
    'token': '18612452753',
    'role':['doctor'],
  }
});

//登录
Mock.mock(`${BASEURl}/cdm/accounts/logout`,'get',function (option){
  console.log('option::::',option);
  return {
    success:true
  }
});
//修改用户标签
Mock.mock(`${BASEURl}/cdm/user/edit/remarks`,'post',function (option){
  console.log('option::::',option);
  return {
    error_code:0
  }
});
//查询日历
Mock.mock(`${BASEURl}/cdm/user/pressure/month/user_id/list`,'get',function (option){
  console.log('option::::',option);
  return {
    fcEvents:[
      {
        title: '血压:110/170,测量时间:2017,2,23',
        start: '2018-04-25',
        cssClass  : 'blue'
      },
      {
        title: '血压:110/170,测量时间:2017,2,13',
        start: '2018-04-05',
        cssClass  : 'red'
      },
      {
        title: '血压:110/170,测量时间:2017,2,13',
        start: '2018-03-05',
        cssClass  : 'red'
      }
    ]
  }
});




const drug_record = Mock.mock({
  'drug_list|20':[
    {  'name': '@cname',
      'dose': /^1[385][1-9]\d{8}/,
      'take_drug_feq|1-1000':100,
      'record_time':'@date("yyyy-MM-dd")',
      'take_end_time':'@date("yyyy-MM-dd")',
      'take_start_time':'@date("yyyy-MM-dd")',
      'remark':'@cparagraph',
      'status':'using',
      'record_id|1-1000':1,
    },
  ],
  'total_count|1-1000': 1000,
});

Mock.mock(`${BASEURl}/cdm/user/get_drug_list`,'post',function (option){
  console.log('option::::',option);
  return drug_record
});


Mock.mock(`${BASEURl}/cdm/user/drug/stop`,'post',function (option){
  console.log('option::::',option);
  return {}
});


const rbp = Mock.mock({
  'drug_list|20':[
    {
      'heart_rate|1-1000':100,
      'created_time':'@date("yyyy-MM-dd")',
      'high_pressure|1-1000':100,
      'high_pressure_status':1,
      'low_pressure_status':2,
      'low_pressure|1-1000':100,
      'pressure_id|1-1000':100,
    },
  ],
  'total_count|1-1000': 1000,
});

Mock.mock(`${BASEURl}/cdm/user/pressure/last_pressure_record/list`,'post',function (option){
  console.log('option::::',option);
  return rbp
});

const adlist = Mock.mock({
  'advice_list|20':[
    {
      'advice_id|1-1000':100,
      'created_time':'@date("yyyy-MM-dd")',
      'service_type':'@ctitle',
      'user_id|1-1000':100,
      'content':'@cparagraph',
      'has_badge':'@date("yyyy-MM-dd")',
      
    },
  ],
  'total_count|1-1000': 1000,
});

Mock.mock(`${BASEURl}/cdm/user/advice/list`,'get',function (option){
  console.log('option::::',option);
  return adlist
});
