# my_vue

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






