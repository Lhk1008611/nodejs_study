/*
   CommonJS规范
       - 引入模块
           - 使用require("模块路径")进行引入模块
           - 引入自定义模块
               - 模块名要以 ./ 或 ../开头（相对路径）
               - 扩展名可以省略不写
                    - node会自动补全扩展名
                        - 补全顺序，如果文件不存在则按以下扩展名顺序往下补全
                            - .js  -->  .json  --> .node
            - 引入核心模块
                - require("核心模块名")  
                    或者 
                - require("node:核心模块名") 
            - 引入文件夹模块
                 - 外部文件只需要引入主文件即可（在主文件中引入文件夹中其他的模块）
                    - 文件夹模块的默认主文件为index.js

       - 向外暴露模块的内容
           - exports
           - module.exports

       - 在进行模块引入时，require('')返回的就是被引入模块的exports
           - 这样就可以通过设置exports的属性向外部暴露模块的内容

        - .cjs文件表示是一个CommonJS标准的文件
*/

const module1 = require("./module1")  //引入自定义模块
const aa = require('./module1').aa //引入模块暴露的某个内容
const {bb,cc} = require('./module1')  //通过解构赋值引入模块暴露的内容

const path = require('path') //引入和兴模块

const cjs = require('./module2.cjs') //node无法自动补全扩展名

const  hello = require('./hello/index') //引入文件夹模块

console.log(module1);
console.log(aa);
console.log(bb);
console.log(cc);
console.log(path);
console.log(cjs);
console.log(hello);

//单个暴露内容
exports.a = 'lhk';
exports.b = 'man';

//同时暴露多个内容
module.exports = {
    aa:'lhk',
    bb:'man',
    cc:'lll',
}
console.log(exports === module.exports);


