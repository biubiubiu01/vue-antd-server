## 基于vue+node+express开发的后台管理系统(简化版)
> 前端部分：**vue** + **ant-design-vue** + **vue-cli** + **vue-router** 搭建 （移植了[vue-antd-admin](https://github.com/biubiubiu01/vue-antd-admin) 的部分页面）

> 后端部分：**node**+**express**+**mysql** 搭建后台

## 实现功能
### vue部分

* 权限验证(三种权限，不同权限显示不同的路由和页面)
* 个性化设置(可自定义开启标签页、布局方式改变和换肤等)
* markdown编辑器 (tui-editor)
* 富文本编辑器 (tinymce)
* 系统用户的增、删、改、查
* 用户基本信息展示

### node部分
* 封装连接mysql的方法;
* 封装token生成和解译的方法（jsonwebtoken）
* 登录后，将登录信息存起生成token，返回token给前端，然后前端请求接口时带上token，每次接口请求前先验证token是否正确或者过期
* 如果用手机号验证码登录，如果未注册，将自动向数据库添加一个用户
* 用户列表的增删改查，分页排序等；

## 项目目录
```
├── public                           ---静态资源文件
├── server                           --- node+express文件     
├── src          
│  ├── api                           ---接口     
│  ├── assets                        ---图片
│  ├── components                    ---可复用的vue组件
│  ├── layouts                       ---布局方式
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── views                         ---页面
│  ├── App.vue                       
│  ├── main.js            
│  ├── permission.js                 ---路由拦截           
├── tests                            ---单元测试文件
├── .browserslistrc
├── .env
├── .eslintrc.js
├──  babel.config.js
├── .jest.config.js                  ---jest的配置
├──  package.json
├──  package-lock.json
├──  README.md
└──  vue.config.js                   ---webpack的配置

```


## How to start

```
# 克隆项目
git clone https://github.com/biubiubiu01/vue-antd-server.git

# 本地已经安装mysql且正常启动

# 最好是安装了navicat，打开navicat，新建一个数据库 然后右键运行sql 选择 server文件夹下面的 web_antd.sql 等待一会后即可获取该项目所有表

# 进入项目目录
cd vue-antd-server

# 安装依赖
npm install 

# 运行系统
npm run serve

# 进入node服务器文件夹
cd vue-antd-server/server

# 安装依赖
npm install 

# 运行node服务器
npm start

```
 

## 还未解决的问题

* excel导出乱码
* 一些其他还没想起来的功能
.... 

## 最后
这是第一次使用Node+express搭建后台，学到了很多后台相关基础知识，由于刚开始写，还有很多问题，还在慢慢改进。
开源不易，若觉得这个项目对你有用，可以点个star





