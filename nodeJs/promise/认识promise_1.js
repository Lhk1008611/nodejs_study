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
                                                                                                                                                               