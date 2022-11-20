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