/*
    所有的CommonJS模块都会被包装到一个函数中

        (function(exports,require,module,__filename,__dirname){
                //模块代码
        })
*/
console.log(arguments);

//当前模块文件的绝对路径
console.log(__filename);  //e:\workspace_vscode\nodeJs\modularization\commJS原理.js

//当前模块文件所在目录
console.log(__dirname);  //e:\workspace_vscode\nodeJs\modularization