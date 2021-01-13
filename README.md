## 基于vue+node+express开发的后台管理系统(简化版)
> 前端部分：**vue** + **antd** + **vue-cli** + **vue-router** 搭建而成

> 后端部分：**node**+**express**+**mysql** 搭建后台

## 基础搭建
### vue部分

* 使用的是[vue-antd-admin](http://gist006.gitee.io/vue-antd-admin/)  的部分页面内容,登录页、用户信息、富文本和系统设置等;
* 拥有三种权限,admin,test,editor;
* 拥有几种主题换肤(简化版)
* 可修改页面布局方式，左右和上下布局
* 动态路由权限，根据不同权限显示不同路由

### node部分
* 封装连接mysql的方法;
* 添加token验证,如果未登录或者token未通过会跳转到到登录页;
* 登录验证，如果为手机号登录且未注册，将会自动注册;
* 用户列表的增删改查 和批量删除
* table表分页，排序等

## 主要内容

1.登录用户名密码验证；

2.手机号登录验证获取验证，如未注册则自动为其注册;

3.登录成功返回一个token，vue请求接口是带上token，根据token存储的信息去获取用户信息；

4.用户基本信息展示 从接口获取;

5.系统管理员可查看系统设置，可对系统用户进行增删改查

## 使用说明

```
1.根目录是vue系统文件
2.server文件是node +express文件
3.默认测试用户：账号:admin 密码123456
4.mysql数据库文件为server/web_antd.mysql,打开数据库将其执行即可查看对应的表
```

 
## 安装

```
# 克隆项目
git clone https://github.com/biubiubiu01/vue-antd-server.git
# 进入项目目录
cd vue-antd-server
# 安装依赖
npm install

# 进入node目录
cd server

# 安装依赖
npm install

# 数据库添加mysql文件，拿到对应的表

# 运行服务器
npm start

# 运行vue项目
npm run serve

```


## 还未解决的问题

* excel导出乱码
* 一些其他还没想起来的功能
.... 

## 最后
这是第一次使用Node+express搭建后台服务器，中间走了不少弯路，也学到了点后台相关基础知识，由于刚开始写，还有很多问题，还在慢慢改进。
开源不易，若觉得这个项目对你有用，可以点个star





