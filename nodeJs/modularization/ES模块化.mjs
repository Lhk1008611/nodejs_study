/*
    在node中默认支持的事CommonJS模块化规范
    
    在node中使用ES模块化的两种方式
        - 1. 使用.mjs作为文件扩展名
        - 2. 修改package.json将模块化规范设置为ES模块化规范
            = package.json是用来描述当前项目（包）的json文件
            - 模块化配置项： 
                - "type": "module"
            - 这种配置将会使得当前项目下所有的js文件都默认为ES模块化标准

    向外部导出内容
        - export
 */

/*
    导入模块，ES模块化不能省略扩展名
    使用ES模块化导入的内容都是常量
    ES模块化都是运行在严格模式下的
 */
import {a,b,c as cc} from './ESmodule.mjs'  //使用as指定别名

/*
    导入默认导出的内容，可以随意命名
 */
import sum from './ESmodule.mjs'  
console.log(a);
console.log(b);
console.log(cc);
console.log(sum);

 
//导出内容
export let aa = 10;

/*
    默认导出
        - 一个模块只能有一个默认导出
        - 默认导出default后面只能接值
 */
let bb = 100;
export default bb;