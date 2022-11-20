const express = require("express");
const path = require("node:path");
const app = express();
const cookieParser = require("cookie-parser")
const session = require('express-session')
var FileStore = require('session-file-store')(session);
//解析cookie
app.use(cookieParser());
//配置静态资源目录
app.use(express.static(path.resolve(__dirname, "public")));
// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
//配置模板引擎ejs
app.set("view engine", "ejs");
//配置模板的路径
app.set("views", path.resolve(__dirname, "views"));

//设置session中间件
app.use(session({
    store: new FileStore({
        //path用来指定session存储路径
        path: path.resolve(__dirname, "./sessions"),
        //用于加密数据
        secret: "1112233",
        //设置session有效时间，单位-秒，默认3600秒
        ttl: 3600,
        //设置清除session对象时间间隔，单位-秒，默认一小时清除一次
        reapInterval: 600,
    }),
    secret: "secret"
}))
//使路由生效
app.use("/student", require("./routers/students"));

app.get("/", (request, response) => {
    response.render("login");
})

//登出功能
app.get("/logout",(request,response)=>{
    //清除session
    request.session.destroy(()=>{
        response.redirect("/");
    });
})

app.post("/login", (request, response) => {
    if (request.body.username === "admin" && request.body.password === "123456") {
        //服务器发送cookie
        // response.cookie("username", "admin",{
        //     // expires:new Date(),  //指定过期日期
        //     maxAge:30*60*1000       //指定过期毫秒数
        // });

        //往session中存入用户数据
        request.session.loginUser = request.body.username
        //将数据保存至session文件中
        request.session.save(()=>{
            response.redirect("/student/list")
        })
    } else {
        response.send("用户名或者密码错误！")
    }
})

//可以在所有路由的后边配置错误路由
app.use((request, response) => {
    response.status(404);
    response.send("<h1>找不到页面</h1>")
})

app.listen(3000, () => {
    console.log("启动服务器");
})