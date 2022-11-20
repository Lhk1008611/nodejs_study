/*
    express 是node中的服务器软件
        - 通过express可以快速在node环境下搭建一个Web服务器
        - 使用步骤
            - 1. yarn init -y
            - 2. yarn add express
 */

//引入express
const express = require("express");
const path = require("node:path");

//获取服务器对象
const app = express();

/*
    1. 启动服务器
        - app.listen(3000); 3000是express的端口号
    2. 访问服务器(在浏览器中输入网址)
        http://localhost:3000
 */
app.listen(3000, () => {
    console.log('1. 启动服务器');
});

/*
    服务器中的代码，对于外部是不可见的
        若希望某些文件（html、js）可以被浏览器访问到，则需要将这些文件设置为静态资源文件
 */
app.use(express.static(path.resolve(__dirname, "./public")));

/*
    3.设置路由
        - 路由可以根据不同的请求方式和请求地址来处理用户的请求
        - 路由函数中的回调函数执行时会传入三个参数：request、response、next
        - response.status(200)  设置状态码,不发送
        - response.send('请求成功') 设置状态码并发送数据
        - response.sendStatus(200); 发送状态码
        - next是一个函数
            - 调用next()后可以触发后续的路由或者中间件（请求放行）

 */
//请求根目录  http://localhost:3000  
app.get('/', (request, response, next) => {
    console.log('1.get请求根目录');
    //处理请求
    console.log(request.url);
    //返回响应
    response.status(200);
    response.send('get请求成功');
});

/*  
    4.中间件
        - 在express中使用app.use定义中间件
        - 可用于做权限验证之类的功能
        - 使用与路由类似
            - 但是中间件会匹配该目录下的所有路径的请求，即所有该目录下的请求路径都会经过该中间将
            - 中间件不看请求方式（get or post）
 */
app.use('/', (request, response, next) => {
    console.log('2.中间件请求');
    next(); //不能再send()之后调用
    // response.status(200).send('111111中间件请求成功');
});

app.use('/', (request, response, next) => {
    console.log('2.中间件请求');
    next();
    // response.status(200).send('2222中间件请求成功');
});

//request.query 表示查询字符串中的请求参数
app.get("/login", (request, response) => {
    console.log("请求登录");
    if (request.query.username === "admin" && request.query.password === "123456") {
        response.send("登录成功！")
    } else {
        response.send("用户名或者密码错误！")
    }
})