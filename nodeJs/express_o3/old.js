const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
const app = express();

//读取json文件的数据
let students = require("./data/students.json")


//配置静态资源目录
app.use(express.static(path.resolve(__dirname, "public")));
// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
//配置json请求体解析
app.use(express.json());
//配置模板引擎ejs
app.set("view engine", "ejs");
//配置模板的路径
app.set("views", path.resolve(__dirname, "views"));

app.get("/hello", (request, response) => {
    response.send("hello页面")
})
/*
    response.render("students", { stus: students });
        - 渲染模板，并将模板返回给浏览器
        - 第二个参数传入一个对象，可以将数据传入到ejs模板中
 */
app.get("/students", (request, response) => {
    response.render("students", { stus: students });
})

//新增数据
app.post("/add_student", (request, response) => {
    const id = students.at(-1) ? students.at(-1).id + 1 : 1;
    const newStudent = {
        id,
        name: request.body.name,
        age: request.body.age
    }

    students.push(newStudent);
    //将数据持久化到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(students)
    ).then(() => {
        //请求重定向，避免表单重复提交
        response.redirect("/students");
    }).catch((err) => {
        console.log(err);
    })
})

//删除数据
app.get("/delete-student", (request, response) => {
    const id = +request.query.id;

    students = students.filter((student) => student.id !== id)

    //将数据持久化到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(students)
    ).then(() => {
        //请求重定向，避免表单重复提交
        response.redirect("/students");
    }).catch((err) => {
        console.log(err);
    })
})

//点击修改跳转到修改页面
app.get("/to_update", (request, response) => {
    const id = +request.query.id;
    student = students.find(student => student.id == id);
    response.render("update", { student: student });
})

//修改学生信息
app.post("/update_student", (request, response) => {
    const { id, name, age } = request.body;
    student = students.find(student => student.id == id);
    student.name = name;
    student.age = age;

    //将数据持久化到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(students)
    ).then(() => {
        //请求重定向，避免表单重复提交
        response.redirect("/students");
    }).catch((err) => {
        console.log(err);
    })
})

//可以在所有路由的后边配置错误路由
app.use((request, response) => {
    response.status(404);
    response.send("<h1>找不到页面</h1>")
})

app.listen(3000, () => {
    console.log("启动服务器");
})