const express = require("express");
const path = require("node:path");
const app = express();

const users = [
    {
        username:"admin",
        password:"123456",
    },
    {
        username:"lhk",
        password:"123456",
    }
]

//1. 配置静态资源目录(使用path配置路径)
app.use(express.static(path.resolve(__dirname, "./public")));

//配置请求体解析功能
app.use(express.urlencoded());

app.listen(3000, () => {
    console.log("服务器启动")
})

//2. 添加一个get路由
app.get("/login", (request, response) => {
    if (request.query.username === "admin" && request.query.password === "123456") {
        response.send("登录成功！")
    } else {
        response.send("用户名或者密码错误！")
    }
})

/**
    2. get路由的restful风格
        - /hello/:id  这种写法表示用户访问/hello/xxx时就会触发该路由
        - 这种在路径中以":"开头命名的称为param，在get请求中可以被解析请求参数
            - 可以通过 request.params 属性获取param
 */
app.get("/hello/:id", (request, response) => {
    console.log(request.params);
    response.send("get路由的restful风格")
})


/*
    3. post请求
        - 通过request.body 获取post请求体的内容
        - 默认情况下express不会自动解析请求体，需要通过中间件来为其增加解析请求体功能
 */
app.post("/login",(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const loginUser = users.find((user)=>{
        return user.username===username && user.password ===password;
    });
    if(loginUser){
        response.send("登录成功！")
    } else {
        response.send("用户名或者密码错误！")
    };
}) 