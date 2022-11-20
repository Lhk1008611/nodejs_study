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