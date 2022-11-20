/*
    通过async快速创建异步函数
        - 异步函数的返回值会自动封装到一个Promise中（返回一个promise）
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