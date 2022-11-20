

## 命令行输入node文档

<a> nodejs.dev/en/</a>

## 进程和线程

- 进程
  - 程序的运行环境
  - 可以理解为现实世界的工厂
- 线程
  - 线程是实际进行运算的程序代码
  - 可以理解为现实世界的工人

## 同步和异步

- 同步

  - 同步的缺点
    - 代码自上而下一行一行的执行
    - 前面的代码执行完成后后面的代码才会执行
    - 同步代码会出现阻塞的情况
    - 一行代码执行慢会影响整个程序的运行速度
  - 解决同步问题
    - Java、Python
      - 通过多线程解决
    - node.js
      - 通过**异步**方式解决

- 异步

  - 一段代码执行不会影响到其他代码执行

  - 异步问题

    - 异步代码无法通过return来设置返回值

    - 可以通过回调函数来返回结果

  - 异步特点

    - 不会阻塞其他代码
    - 需要通过回调函数来返回结果

  - 基于回调函数的异步产生的问题

    - 可能回产生回调地狱（死亡金字塔）
    - 代码可读性差
    - 可调试性差

  - 解决回调函数的异步问题

    - **通过promise来代替回调函数接收返回值**

## Promise

- promise是一个可以用于存储数据的对象（容器）
  - 其存储数据的方式比较特殊
  - 基于其特殊的存储方式，promise可以用于存储异步调用的结果数据

``` js
//Promise构造函数中需要传入一个回调函数作为参数
//该回调函数会在创建promise时调用，调用时会传入两个函数（resoleve和reject）作为参数
//resoleve和reject可以向promise中存储数据
//resoleve在执行正常的时候存储数据，reject在执行错误的时候存储数据
//通过函数来向promise中添加数据，好处就是可以异步调用的数据添加到promise中去
const promise = new Promise((resoleve, reject) => {
    // setTimeout(() => {
    //     resoleve('lhk');
    // }, 2000);
    reject('lhk');

});

//简写
/*
    Promise.resolve('lhk')  
    Promise.reject('异常')
*/

/*
    通过实例方法then()从promise中读取数据
        - then()中需要两个回调函数作为参数，回调函数用来获取promise中的数据
            - 通过resolve函数存储的数据，会调用第一个回调函数进行返回，
                因此可以在第一个函数进行数据的处理
            - 通过reject存储的数据或出现异常时，会调用第二个回调函数进行返回
                因此可以在第二个函数中进行异常的处理
*/
promise.then((result) => {
    console.log('result', result)
}, (reason) => {
    console.log('reason', reason)
})

/*
    实例方法catch(),相当于 then(null,(reason)=>{})
        只需要一个回调函数作为参数
        可专门用于处理promise异常
*/
promise.catch((reason)=>{
    console.log('reason', reason)
})

/*
    实例方法finally()
        无论promise是否执行正常，都会执行finally()
        无法获取到promise中存储的数据
 */
promise.finally(()=>{
    console.log('最终执行')
})

//promise对象中[[]]包起来的属性属于隐藏属性，无法进行修改
/*
    Promise中维护了两个隐藏属性
        PromiseResult
            - 用于存储数据
        PromiseState
            - 记录promise的状态，有三种
                pending     （进行中）
                fulfilled   （已完成）
                rejected    （拒绝）
            - PromiseState只能修改一次，修改以后永远不会变
    流程：
        当Promise创建时，PromiseResult初始化为pending
            当通过resolve存储数据时，PromiseState变为fulfilled，PromiseResult变为resolve存储的数据
            当通过reject存储数据或出现异常时，PromiseState变为rejected，PromiseResult变为reject存储的数据 或 异常对象
        当通过then()读取数据时，相当于为Promise设置了回调函数
            如果PromiseState变为fulfilled，则调用then()的第一个回调函数来返回数据
            如果PromiseState变为rejected，则调用then()的第二个回调函数来返回数据

*/
console.log(promise);

```

- Promise的链式调用
  - 可以解决回调地狱（死亡金字塔）

``` js
/*
    promise中的
        then()
        catch()
        finally()
    这三个函数都会返回一个新的Promise对象
        then()、catch()里面的返回值会存进新的promise中
        finally()的返回值不会存储到新的Promise对象中
*/
const promise = new Promise((resolve, reject) => {
    resolve('promise');
})

/*
    Promise的链式调用
        后面的then()或catch()会读取上一步的then()或catch()
        如果上一步方法的执行结果不是不是当前方法想要的结果，则跳过当前方法
    
        当promise出现异常时，而整个链式调用没有catch处理异常，则异常会向外抛出
*/
const promise2 = promise.then((result) => {
    console.log('result', result);
    return 'promise2';
}).then((result) => {
    console.log('result', result);
    return 'promise3';
}).then((result) => {
    console.log('result', result);
    return 'promise4';
}).catch((reason) => {
    return 'reason';
}).then((result) => {
    console.log('result', result);
});


function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000);
    })
}

sum(100, 287).then((result) => {
    console.log(result);
})

sum(100, 100)
    .then((result) => result + 1)
    .then((result) => result + 10)
    .then((result) => result + 100)
    .then((result) => console.log(result))
```

- Promise的静态函数

``` js
/*
    Promise中的静态函数
        - Promise.resolve() 创建一个立即完成的Promise
        - Promise.reject()  创建一个立即拒绝的Promise
        - Promise.all([]) 同时返回多个Promise的执行结果
            其中数组中有一个Promise报错，直接返回错误
        - Promise.allSettled([]) 同时返回多个Promise的执行结果（无论其中的Promise执行成功与否）
        - Promise.race([]) 返回执行最快的一个Promise的执行结果（无论其中的Promise执行成功与否）
        - Promise.any([]) 返回执行成功最快的一个Promise的执行结果
            当所有Promise都出错，则报错
*/

Promise.all([
    1, 
    2, 
    3
]).then((result) => {
    console.log(result);
})

Promise.allSettled([
    1, 
    2, 
    3
]).then((result) => {
    console.log(result);
})

Promise.any([
    Promise.reject('sss'),
    1,
    Promise.reject('www')
]).then((r)=>{
    console.log(r);
}).catch((r)=>{
    console.log('错误');
})

Promise.race([
    Promise.reject('sss'),
    1,
    2,
    3
]).then((r)=>{
    console.log(r);
}).catch((r)=>{
    console.log('错误');
})
```

- 调用栈、任务队列
  - 宏任务队列
  - 微任务队列

``` js
/*
    js是单线程的，js运行时是基于事件循环机制（event loop）
        = 调用栈（后进先出的数据结构）
        = 任务队列（先进先出的数据结构）
            - js中的任务队列有两种
                - 微任务队列（里面的任务先进入调用栈运行）
                - 宏任务队列（里面的任务后进入调用栈运行）
            Promise的then()、catch()、finally()方法中的代码会放入微任务队列中
*/

setTimeout(()=>{
    console.log('放入宏任务队列中');
})

//将一个任务放入微任务队列中
queueMicrotask(()=>{
    console.log('放入微任务队列中');
})

console.log('直接在调用栈运行');
```

- 手戳简易版Promise
  - 实现值存储和值读取
  - 实现值只存储一次
  - 实现异步调用
  - 实现链式调用

``` js
class MyPromise{

    #result

    #callbacks = []

    #status = 0

    constructor(excutor){
        excutor(this.#resolve.bind(this),this.#reject.bind(this))
    }

    #resolve(result){
        if(this.#status!==0) return
        this.#result = result
        this.#status =1

        queueMicrotask(()=>{
            this.#callbacks.forEach(callback =>{
                callback()
            })
        })
    }

    #reject(reason){

    }

    then(onResolve,onReject){
        return new MyPromise((resolve,reject)=>{
            if(this.#status === 0){
                this.#callbacks.push(()=>{
                    resolve(onResolve(this.#result))
                })
            }else if(this.#status === 1){
                queueMicrotask(()=>{
                    resolve(onResolve(this.#result))
                })
             }
        })
    }
}

const my = new MyPromise((reslove,reject)=>{
    setTimeout(()=>{
        reslove('lhk')
    },1000)

})

console.log(my);

my.then((result)=>{
    console.log('result',result);
    return 1;
}).then((result)=>{
    console.log('result',result);
    return 2;
}).then((result)=>{
    console.log('result',result);
})

setTimeout(()=>{
    console.log(my);
},1000)
```



## async 与 await

1. 通过async可以快速创建异步函数
   - 异步函数：返回Promise的函数
2. await的使用

```js
/*
    通过async快速创建异步函数
        - 异步函数的返回值会自动封装到一个Promise中
*/
async function fn() {
    return 111;
}

fn().then((result) => {
    console.log(result)
})

//等价于以下
function fn1() {
    return Promise.resolve(111)
}

fn1().then((result) => {
    console.log(result);
})

/*
    在async声明的异步函数中可以使用await关键字来调用异步函数
 */
function sum(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000);
    });
}
/*
    Promise通过链式调用解决了异步调用回调函数死亡金字塔问题
        在async中使用await可以以同步方式调用异步的代码（实际上还是异步调用）
            - await只能使用于async声明的异步函数中 或者 es模块的顶级作用域中
        以下例子是 在async声明的异步函数里面 调用 异步函数，所以可以使用await对内部的异步调用进行同步处理
            - 如果async声明的异步函数中内有使用await，则该函数同步执行内部代码（优先执行）
 */
async function fn2() {
    // sum(100, 200)
    //     .then((result) => sum(result, 100))
    //     .then((result) => sum(result, 100))
    //     .then((r) => console.log(r))

    /*
        await会等待异步函数执行完毕后将结果进行返回（而不是只返回Promise对象）
            - await只会阻塞async声明的函数里面的代码，不会阻塞外部的代码
            - 使用try-catch来对使用await的异步代码进行异常处理
            - await不仅可以用于异步代码，普通代码也可以使用
    */
   try {
    let result = await sum(100,200); //await关键字标识的一行戴安执行完毕后，该行代码后面的代码会被放入微任务队列中
   } catch (error) {
    console.log(error);
   }
   await console.log('1111');
   console.log('2222');

}

fn2();

console.log(3333);


/*
    async的立即执行函数
*/
(async ()=>{
    console.log('立即执行函数');
})()
```



## 模块化

1. 模块化好处
   - 化整为零，更便于维护
   - 按需引用模块
2. 在早期网页是没有一个实质化的模块化规范的
   - 通过script标签来引入多个js文件
     - 无法选择要引入模块那些内容
       - 例如引入jQuery是是将整个文件进行引入
     - 在复杂的模块场景下非常容易出错
       - 在引入js的时候可能会出现引入顺序错误，导致项目出错

### CommonJS模块化规范

- 在nodeJS中，默认支持的模块化规范叫CommonJS
  - 在CommonJS中，一个js文件就是一个模块

```js
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
                    - 文件夹模块的默认主文件为index.js（入口文件）

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



```

### CommonJS模块化原理

```js
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
```

### ES模块化规范

- 在node中默认支持的事CommonJS模块化规范
- 在浏览器中也支持ES模块化，但通常不会直接使用（需要考虑兼容性的问题）
  - 通常会结合打包工具使用

```js
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
```

## node核心模块

- 核心模块是node自带的模块，可以在node直接使用

### process

```js
/*
    node自带许多模块，可以直接使用
        - global 是node中的全局对象，作用类似于浏览器的宿主对象（window）
        - ES标准下，全局对象的标准名是 globalThis (在所有js环境下都是通用的)
            -例如：浏览器的 globalThis 就是 window，在node中 globalThis 就是 global
 */
console.log(global === globalThis);  //true
console.log(globalThis);

/*
    核心模块
        process
            - 表示当前的node进程
            - 可以通过该对象获取进程的信息，或者对进程组各种操作
            - process是一个全局变量，可以直接使用
                - 1. process.exit([code])     结束当前进程，终止node进程
                - 2. process.nextTick(callback)     将函数插入到tick队列
                        - 
                执行顺序：(node版本18.12.0)
                    调用栈
                    微任务队列
                    tick队列
                    宏任务队列
 */
console.log(process);
// process.exit(0);     //终止node进程

setTimeout(()=>{
    console.log(1);
});     //宏任务队列

queueMicrotask(()=>{
    console.log(2);
})      //微任务队列

process.nextTick(()=>{
    console.log(3);
})      //tick队列

console.log(4); //调用栈
```

### path

```js
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
```

### fs（File System）

```js
/*
    fs（File System）
        - 通过fs可以操作磁盘中的文件（即IO操作）
        - 引入fs:   require('node:fs')
        - 通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
            - buffer是一个临时用来存储数据的缓冲区
 */

const { readFile } = require('node:fs');
const fs = require('node:fs');
const path = require('node:path');

//同步方式读取文件（会出现阻塞，不推荐使用）
const buffer = fs.readFileSync(path.resolve(__dirname, './test.txt'));
console.log(buffer.toString());

//异步方式读取文件，不会影响后续代码的执行
fs.readFile(path.resolve(__dirname, './test.txt'),
    (error, buffer) => {
        if (error) {
            console.log(error);
        } else {
            console.log(buffer.toString());
        }
    }
)
console.log('后续代码');

/*
    Promise版的fs方法
 */
const fsp = require('node:fs/promises');

fsp.readFile(path.resolve(__dirname, './test.txt'))
    .then((buffer) => {
        console.log(buffer.toString());
    })
    .catch((error) => {
        console.log(error);
    });

/*
    async版的操作磁盘数据方式
 */
(async () => {
    try {
        const buffer = await fsp.readFile(path.resolve(__dirname, './test.txt'));
        console.log(buffer.toString());
    } catch (error) {
        console.log(error);
    }
})();
```

- fs模块常用函数

```js
/*
    fs常用函数
        - fs.readFile() 读取文件
        - fs.appendFile()  将数据添加到已有文件中,文件不存在则创建文件并添加数据
        - fs.mkdir()  创建目录
        - fs.rmdir()  删除目录
        - fs.rm()     删除文件、文件夹
        - fs.rename()   重命名
        - fs.copyFile() 复制文件（复制）
 */
const fs = require('node:fs/promises')
const path = require('node:path')
fs.appendFile(
    path.resolve(__dirname, './test.txt'),
    'appendFile添加数据'
).then((result) => {
    console.log('添加成功');
});
```

## NPM包管理器

- package.json文件的作用

  - package.json是包的描述文件
  - 基于node的项目都是通过package.json来对羡慕进行描述
    - 每一个node项目都必须有package.json

  ```json
  {
    "name": "npm",
    "version": "1.0.0",
    "description": "",
    "main": "_npm.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "lodash": "^4.17.21"
    }
  }
  ```

  - "name"——项目名
  - "version"——项目版本号

  - "main"属性表示项目的**主文件**（**入口文件**），一般为index.js

  - "scripts"——可以自定义一些命令
    - 定义后可以直接通过npm来执行这些命令
    - start、test命令执行为`npm start`、`npm test`
    - 其他一些自定义命令执行为`npm run 命令`

  - "dependencies"属性

    >   "dependencies": {
    >
    >​    	"lodash": "^4.17.21"
    >
    >  }
    >
    >
    >
    >​    \- "lodash": "^4.17.21"  表示匹配4.x.x的最新版本
    >
    >​    \- "lodash": "~4.17.21"  表示匹配4.17.x的最新版本
    >
    >​    \- "lodash": "*"     表示匹配最新版本

- npm相关操作

  ```js
  /*
      npm的相关命令
          - npm init 初始化项目，自动创建package.json文件（需要输入引导）
          - npm init -y 初始化项目，按照默认值创建package.json文件
          - npm install 包名  下载指定的包
              - 下载的包会放入当前项目下的node_modules目录下
              - 且会自动在package.json文件中添加下载的包的"dependencies"属性
              - 会自动添加package-lock.json文件
                  - package-lock.json文件 帮助加速npm下载
          - npm install   自动安装package.json文件中"dependencies"属性中的所有包
          - nom install 包名 -g   全局安装
              - 全局安装是将包安装到计算机中，不会被放入node_modules目录下
              - 全局安装的通常都是一些工具（命令行工具之类的）
          - npm uninstall 包名    卸载指定包，卸载后会自动清除该包的依赖属性
  
      npm镜像
          - npm仓库服务器位于国外，国内用户下载包时会很慢
          - 通过配置npm镜像服务器可以解决该问题
          - 镜像的配置：（镜像网站：https://npmmirror.com/）
              - 1. 通过安装cnpm替代npm使用国内的npm镜像（使用方式与npm一样）
                  - npm install -g cnpm --registry=https://registry.npmmirror.com
              - 2.修改npm的仓库地址为国内镜像仓库
                  - npm set registry https://registry.npmmirror.com
              - 还原至原版npm仓库
                  - npm config delete registry
              - 查看npm仓库地址
                  - npm config get registry
   */
  
  //下载好的包直接引入即可使用
  const _ = require("lodash");
  console.log(_);
  ```

## yarn (yet another resource navigator)

- 安装yarn

  1. `npm i yarn -g` 	全局安装yarn
  2. `corepack enable`    
     - 在新版的node中，corepack中包含了yarn，故可以通过开启corepack 的方式启动yarn

- 切换yarn版本

  1. `corepack prepare yarn@stable --activate`	切换最新版yarn
  2. `corepack prepare yarn@1 --activate`       切换为1.x.x版本的yarn

  ```js
  /*
      yarn常用命令
          - yarn init 初始化项目
          - yarn init -y 按照默认的初始值初始化项目
          - yarn add xxx 下载指定包（添加指定依赖）
          - yarn global add xxx 全局安装
          - yarn remove xxx 移除包
          - yarn global remove xxx 全局移除
          - yarn 自动安装依赖
          - yarn run 执行自定义脚本
          - yarn 指令 执行自定义脚本
          - yarn global bin 全局安装目录
      
      yarn镜像配置
          - yarn config set registry https://registry.npmmirror.com
      yarn恢复至原版yarn仓库
          - yarn config delete registry
          
   */
  ```

- 注意：（解决yarn全局安装后不能使用问题）
  
  - 通过yarn进行全局安装时，默认的yarn目录并不在环境变量中，需要手动将路径添加到环境变量中

### PNPM

- pnpm 安装
  1. `npm i pnpm -g`  	全局安装pnpm
  2. `corepack enable`    corepack中包含了pnpm

```js
/*
    pnpm常用命令
        - pnpm init
        - pnpm add xxx 添加依赖
        - pnpm add -D xxx 添加开发依赖
        - pnpm add -g xx 全局安装
        - pnpm install 安装依赖
        - pnpm remove xxx 移除指定包
    
    pnpm镜像配置
        - pnpm config set registry https://registry.npmmirror.com
    pnpm恢复至原版pnpm仓库
        - pnpm config delete registry
 */
```



## HTTP协议

- 网络基础
  - 网络的服务器基于请求和响应
  - 协议：https://
  - 域名（domain）：www.bilibili.com
  - 请求和响应是一段特殊格式的数据（报文），这种格式是由HTTP协议决定的

- 面试题

  1. 在浏览器中输入地址后发生了什么？

     > 1. DNS域名解析
     > 2. 浏览器和服务器建立连接（tcp/ip连接——三次握手）
     > 3. 浏览器向服务器发送请求（HTTP协议）
     > 4. 服务器处理请求，并返回响应（HTTP请求）
     > 5. 浏览器将响应的数据渲染在页面上
     > 6. 断开与服务器的连接（四次挥手）

  2. 客户端与服务器建立TCP/IP连接时的三次握手、断开连接时的四次挥手？

     - 三次握手（三次握手可以保证连接是可靠的）

       > 1. 客户端向服务器发送连接请求（SYN）
       > 2. 服务器收到连接请求，向客户端返回消息（SYN，ACK）
       > 3. 客户端向服务器发送同意连接的信息（ACK）

     - 四次挥手

       > 1. 客户端向服务器发送请求，通知服务器数据发送完毕，请求断开连接（FIN）
       > 2. 服务器接收到该请求，返回一个表示知道客户端数据发送完毕的响应（ACK）
       > 3. 服务器接收完客户端发送的数据，返回一个表示服务端接收完毕且可以断开连接的响应（FIN，ACK）
       > 4. 客户端接收到该响应，发送一个表示客户端已断开连接的请求（ACK）

- TCP/IP协议簇

  - TCP/IP协议簇中包含了一组协议

    - 这组协议规定了互联网中所有通信的细节

  - 网络通信的过程

    > 应用层 （HTTP协议）
    >
    > 	- 软件的层面，浏览器、服务器都属于应用层
    >
    > 传输层   （TCP协议）
    >
    > 	- 发送数据时负责对数据进行拆分，把大数据拆分成一个个小的数据包
    > 	- 接收数据时负责对每一个小数据包进行合并
    >
    > 网络层（IP协议）
    >
    > 	- 发送数据时负责给每一个小的数据包添加信息（发送的目标等等信息）
    > 	- 接收数据时负责给每一个小数据包去除之前添加的信息
    >
    > 数据链路层
    >
    > 	- 传输信息
    > 	- 接收信息

  - HTTP协议是属于应用层的协议
    
    - 用来规定客户端和服务器之间通信的报文（message）格式

### 报文

- 请求报文（**request**）

  - 客户端发送到服务器的报文称之为请求报文**request**

  - 其格式为

    > 请求首行：请求报文的第一行
    >
    > 请求头：用于告知服务器浏览器的信息
    >
    > 空行 : 用于分割请求头和请求体
    >
    > 请求体

  - get请求主要用来向服务器请求资源
    - get请求通过查询字符串将数据发送给服务器
    - 由于查询字符串会在浏览器地址栏中直接显示
      1. 导致安全性较差
      2. 同时由于url地址长度有限制，所以get请求无法发送较大的数据
  - post请求主要用来来向服务器发送数据
    - post请求通过请求体发送数据
      1. 由于post请求通过请求体发送数据，无法在浏览器地址栏中直接显示，所以安全性较get请求好
      2. 请求体的大小没有限制，可以发送任意大小的数据
      3. 注意，http协议是属于明文传输的，是不安全的协议，https属于安全协议

- 响应报文

  - 格式

    > 响应首行
    >
    > 	- 包括http协议版本和响应状态码
    >
    > 响应头：用于告知浏览器 响应的信息
    >
    > 空行： 用于分割响应头和响应体
    >
    > 响应体：服务器返回给浏览器的内容

  - 响应状态码规则

    - 1xx	 表示请求处理中
    - 2xx      表示请求成功
    - 3xx      表示请求重定向
    - 4xx      表示客户端错误
    - 5xx       表示服务器的错误 

### 服务器

- 服务器的主要功能
  1. 可以接收到浏览器发送的请求报文
  2. 可以向浏览器返回响应报文



## Express

- express一个运行在nodeJS上的一个服务器软件

  - fast	快速
  - unopinionated     灵活
  - minimalist      极简的

  ```js
  /*
      express 是node中的服务器软件
          - 通过express可以快速在node环境下搭建一个Web服务器
          - 使用步骤
              - 1. yarn init -y
              - 2. yarn add express
   */
  
  //引入express
  const express = require("express");
  
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
      console.log( request.url);
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
  app.use('/',(request,response,next)=>{
      console.log('2.中间件请求');
      next(); //不能再send()之后调用
      response.send('1111中间件请求成功');
  });
  
  app.use('/',(request,response,next)=>{
      console.log('2.中间件请求');
      response.send('2222中间件请求成功');
  });
  ```

### nodemon

- nodemon用于node服务端**代码修改后自动重启服务器**，避免非必要的手动重启服务器
  - 安装
    1. 全局安装
       - `npm i nodemon -g`
       - `yarn global add nodemon`
       - 启动
         - 命令行输入`nodemon`即可运行，默认启动项目下的index.js文件，所以确保项目中存在该文件
         - 命令行输入`nodemon 文件路径`也可以启动指定文件
       
    2. 项目安装

       - `npm i nodemon -D`	

       - `yarn add nodemon -D`	-D表示添加至开发依赖,项目打包时可以删除开发依赖
       - 启动方式
         - `npx nodemon`
         - `npx nodemon 文件路径`

  - 可以在scripts中添加自定义命令

    ```
      "scripts": {
        "start": "npx nodemon ./index.js"
      }
    }
    ```

### 静态资源

```js
/*
    服务器中的代码，对于外部是不可见的
        若希望某些文件（html、js）可以被浏览器访问到，则需要将这些文件设置为静态资源文件
 */
app.use(express.static(path.resolve(__dirname, "./public"))); //设置静态资源目录
```



### get请求获取请求参数

```js
//request.query 表示查询字符串中的请求参数
app.get("/login", (request, response) => {
    console.log("请求登录");
    if (request.query.username === "admin" && request.query.password === "123456") {
        response.send("登录成功！")
    } else {
        response.send("用户名或者密码错误！")
    }
})
```

```js
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
```

### post请求获取资源

```js
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

//配置请求体解析功能
app.use(express.urlencoded());

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
```

### 模板引擎（ejs）

- 传统的html页面属于静态页面，不会自动跟随服务器中数据的变化而变化

- 在node中存在多个模板引擎，其中ejs是其中之一，它是运行在服务器端的

  - 使用步骤

    > 1. 安装ejs	`yarn add ejs`
    >
    > 2. 配置express的木本引擎为ejs     
    >
    >    ```js
    >    //配置模板引擎ejs
    >    app.set("view engine","ejs");
    >    //配置模板的路径
    >    app.set("views",path.resolve(__dirname,"views"));
    >    ```
    >
    > 3. 模板会被放在项目下的views目录，要使其能够被外部访问，需要被express渲染后才能使用
    >
    >    ```js
    >    /*
    >        response.render("students", { stus: students });
    >            - 渲染模板，并将模板返回给浏览器
    >            - 第二个参数传入一个对象，可以将数据传入到ejs模板中
    >     */
    >    app.get("/students", (request, response) => {
    >        response.render("students", { stus: students });
    >    })
    >    ```
    >
    > 

  - ejs模板语法

    > <%-  %>  	对内容中的特殊字符进行转义后输出
    >
    > 	- 这种设计主要为了防止xss攻击（跨站脚本攻击）[XSS攻击_百度百科 (baidu.com)](https://baike.baidu.com/item/XSS攻击/954065)
    >
    > <%-  %>      不对内容中的特殊字符进行转义直接输出
    >
    > <%  %>	    可以编写js代码，js会在node服务器中执行



### Router

- Router是express中创建的一个对象

  - 其实际上是一个中间件，可以在该中间件上去绑定各种路由及其他的中间件

  - 通过使用router可以将路由写入不同的js中

  - 使用时先通过use使其生效

    > ```js
    > //创建Router
    > const router = express.Router();
    > ```
    >
    > ```js
    > //引入外部路由js文件
    > const studentRouter = require("./routers/students")
    > //使路由生效
    > app.use("/student",studentRouter);
    > ```
    >
    > 或者如下方式引入
    >
    > ```js
    > //使路由生效
    > app.use("/student", require("./routers/students"));
    > ```
    >
    > 

### cookie

- 由于http协议是一个无状态的协议，所以服务器无法区分请求是否发自同一个客户端

- 于是诞生了cookie用于解决http协议的无状态问题

  - cookie是HTTP协议中用来解决无状态问题的技术

  - 其本质就是http协议中的一个头

    1. 服务器已响应头的形式将cookie发送给客户端

       > ```js
       >     //服务器发送cookie
       >     response.cookie("username","admin");
       > ```

    2. 客户端接收到cookie后会将其存储，并在下次向服务器发送请求时将其返回给服务器

       > ```js
       >  /*
       >       读取客户端返回来的cookie
       >          - 需要安装cookie-parser，并通过use设置中间件
       >              - 1. 安装cookie-parser  yarn add cookie-parser
       >              - 2. 引入cookie-parser
       >                     const cookieParser = require("cookie-parser")
       >              - 3. 设置为中间件
       >                     app.use(cookieParser());
       >              - 4. 读取cookie
       >              		request.cookies
       >   */
       > router.get("/list", (request, response) => {
       >     if(request.cookies.username){
       >         response.render("students", { stus: students });
       >     }else{
       >         response.redirect("/")
       >     }
       > })
       > ```

  - cookie的有效期

    - 默认情况下cookie的有效期就是一次会话（session）

      - 会话就是一次浏览器打开到关闭的过程

        ```js
        app.post("/login", (request, response) => {
            if (request.body.username === "admin" && request.body.password === "123456") {
                //服务器发送cookie
                response.cookie("username", "admin",{
                    // expires:new Date(),  //指定过期日期
                    maxAge:30*60*1000       //指定过期毫秒数
                });
                response.redirect("/student/list")
            } else {
                response.send("用户名或者密码错误！")
            }
        })
        ```

  - cookie一旦发送给客户端，则由客户端进行维护

    - 服务端可以通过发送新的同名cookie来对旧cookie进行替换，可以达到删除的效果

      ```js
       response.cookie("username", "",
                  maxAge:0       //指定过期毫秒数
              });
      ```

- cookie存在的**不足**

  - cookie是由服务器，浏览器保存
    - 每次浏览器访问服务器时都需要将cookie返回，因此cookie中不能存放较多的数据、
    - 且cookie存储在客户端，容易被篡改盗用
      - 因此在使用cookie时一定不能存储敏感信息

### session

- session是服务器中的一个对象，这个对象用来存储用户的数据
- 每一个session都有一个id
  - id会通过cookie的形式发送给浏览器，因此session是依赖cookie的
  - 客户端每次访问服务器时只需要将存储有id的cookie放回给服务器即可获取用户在服务器存储的数据

- 在express中通过express-session组件来实现session的功能

  - 使用步骤

    1. 安装

       > ```bash
       > yarn add express-session
       > ```

    2. 引入

       > ```js
       > const session = require('express-session')
       > ```

    3. 设置为中间件

       > ```js
       > //设置session中间件
       > app.use(session({
       >     secret:"secret"
       > }))
       > ```

    4. 可以通过`request.session`获取session对象

  - session默认有效期是一次会话

    - session何时会失效

      1. 浏览器的存储id的cookie丢失
      2. 服务器中的session对象丢失

    - express-session默认是将session存储到内存中的，所以服务器重启会导致session自动重置

      - 因此使用session时通常会对session进行持久化操作（写入文件或者数据库中）

      - 将session存入文件中

        1. 安装session-file-store

           > ```bash
           > yarn add session-file-store
           > ```

        2. 引入session-file-store

           > ```js
           > var session = require('express-session');
           > var FileStore = require('session-file-store')(session);
           > ```

        3. 设置中间件

           > ```js
           > var fileStoreOptions = { 
           >      	//path用来指定session存储路径
           >         path: path.resolve(__dirname, "./sessions"),
           >         //用于加密数据
           >         secret: "1112233",
           >         //设置session有效时间，单位-秒，默认3600秒
           >         ttl: 8,
           >         //设置清除session对象时间间隔，单位-秒，默认一小时清除一次
           >         reapInterval: 10,
           >  };
           >  
           > app.use(session({
           >     store: new FileStore(fileStoreOptions),
           >     secret: 'keyboard cat'
           > }));
           > ```

  - request.session.destroy   立即清除session

    > ```js
    > //登出功能
    > app.get("/logout",(request,response)=>{
    >     //清除session
    >     request.session.destroy(()=>{
    >         response.redirect("/");
    >     });
    > })
    > ```

  - request.session.save     将数据保存至session文件中

    > ```js
    > //将数据保存至session文件中
    > request.session.save(()=>{
    >             response.redirect("/student/list")
    >         })
    > ```

## csrf（跨站请求伪造）

- [跨站请求伪造_百度百科 (baidu.com)](https://baike.baidu.com/item/跨站请求伪造/13777878)

- 防御措施
  - https://baike.baidu.com/item/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0/13777878#2