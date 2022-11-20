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
                执行顺序：(commonjs规范)
                    调用栈
                    tick队列
                    微任务队列
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