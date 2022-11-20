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