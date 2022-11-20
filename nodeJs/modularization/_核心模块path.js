/*
    path
        - 表示路径
        - 通过path可以获各种路径
        - 使用前需要先进行引用 
        - path.resolve()
            - 返回当前文件的工作目录
            - 1.运行node执行命令（F5运行）:   D:\Program Files\node.js\node.exe .\modularization\_核心模块path.js
                输出目录：          e:\workspace_vscode\nodeJs
            - 2.运行node执行命令（终端运行）:   PS E:\workspace_vscode\nodeJs\modularization> node .\_核心模块path.js
                输出目录:           E:\workspace_vscode\nodeJs\modularization
            - 3.运行node执行命令（终端运行）:   PS E:\workspace_vscode\nodeJs> node .\modularization\_核心模块path.js
                输出目录:           E:\workspace_vscode\nodeJs

        - path.resolve(相对路径)
            - 将相对路径转换成绝对路径并返回，返回的绝对路径根据当前工作目录不同而不同
        
        - path.resolve(绝对路径，相对路径)  
            - 将绝对路径与相对路径结合并进行返回
            - __dirname 代表当前文件所在目录的绝对路径
*/

const path = require("node:path") //引用核心模块path
console.log(path);

const result = path.resolve();
console.log(result);    // 输出 e:\workspace_vscode\nodeJs（工作目录）

const result1 = path.resolve('./_核心模块path.js');
console.log(result1);   //输出  e:\workspace_vscode\nodeJs\_核心模块path.js

//推荐使用以下这种方式进行路径拼接，
const result2 = path.resolve(__dirname,'./_核心模块path.js');
console.log(result2);   //输出  e:\workspace_vscode\nodeJs\modularization\_核心模块path.js