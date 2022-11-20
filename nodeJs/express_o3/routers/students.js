const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
//创建Router
const router = express.Router();

//读取json文件的数据
let students = require("../data/students.json")

router.use((request,response,next)=>{
    if (request.session.loginUser) {
       next();
    } else {
        response.redirect("/");
    }
})

router.get("/list", (request, response) => {
    // if(request.cookies.username){
    //     response.render("students", { stus: students });
    // }else{
    //     response.redirect("/")
    // }
    response.render("students", { stus: students,username:request.session.loginUser });
})

router.post("/add", (request, response, next) => {
    const id = students.at(-1) ? students.at(-1).id + 1 : 1;
    const newStudent = {
        id,
        name: request.body.name,
        age: request.body.age
    }

    students.push(newStudent);
    next();
})


router.get("/delete", (request, response, next) => {
    const id = +request.query.id;

    students = students.filter((student) => student.id !== id)
    next()
})

router.get("/to_update", (request, response) => {
    const id = +request.query.id;
    student = students.find(student => student.id == id);
    response.render("update", { student: student });
})


router.post("/update", (request, response, next) => {
    const { id, name, age } = request.body;
    student = students.find(student => student.id == id);
    student.name = name;
    student.age = age;
    next()
})


//将数据持久化到json文件中
router.use((request, response) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(students)
    ).then(() => {
        //请求重定向，避免表单重复提交
        response.redirect("/student/list");
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router