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