## 美租宝

### 项目简介： 美租宝是一个美容仪器、产品、项目，技术、人才租赁的平台，表面上它做的是美容机构服务的生意，是一个 B2B 的行业解决方案平台，实现美容产品、人才的由买到租。但鬍子先生更看重的是后面隐藏的价值，它做的是看不见的金融服务，通过引进优质的产品，透过良好的风控，持续优化资金成本，从而把美容经营者的经营成本和风险降到最低，给予美容行业经营者提供轻资产运营的可能性。

### 用到技术：

### 美租宝做的是一个微信公众号的项目，选择用 vue 来做框架搭建，配合了 mint-ui 移动端 ui 框架 mt-popup Toast, Picker, Indicator MessageBox.confirm 更好的运用，微信授权，分享朋友圈 ，视屏下载，图片下载 百度云下载等，首页 banner 跳转获取头像，昵称 完善个人信息 微信授权 px2rem 的用法，总的来说，做起来比较顺利，当然也有遇到技术难点的，比如做地址选择时，数据不是最新的，这就需要我们来选择最新的数据，站在用户的角度来考虑问题很重要，上传图片时，遇到压缩的问题，收获不少，

### 成长：

### 项目接近尾声，收获的不仅是技术成长，还有伙伴友谊，遇到困难，大家相互打气加油，大家也倾囊相授，其实技术是分享的，共同学习成长的，表达能力也很重要，互相明白，节约时间，提高效率

<!-- # my_vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).







张天翼的遗产:


  --电子签名实现方式
    -- 从父组件传入imageUrl
    -- 初始化一个img标签,放入url,添加跨域属性
    -- 计算宽为屏幕宽度,自适应高度
    -- 放入canvas
    -- canvas绑定touch事件绘图函数
    -- 上传签名 canvas.toDateUrl 传给服务器
    -- 重写签名 canvas重新绘制img

  --下单分5种
     --  仪器 details
     --  技师 essence
     --  配套产品 matching
     --  视频 train
     --  项目 cooperation

  下单特殊处理规则:
    --需要签名的:
            仪器、技师、项目
    --有租赁日期的:
            仪器 技师
    --需要选择地址的:
            仪器 技师 产品

  totalPrice计算公式
    -- 仪器: 租赁月份 * 首租价格 + 押金
    -- 技师: 租赁天数 >= 5 ? 租赁天数 * 日薪 : 租赁天数 * 日薪 * 0.8
    -- 产品: 数量 * 单价
    -- 视频: 积分 或 单价
    -- 项目: 诚意金





 -->
