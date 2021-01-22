# promise


## promise 实现思路


### 步骤一 简单版本
- new Promise 时候 让excutor执行，传如一个成功resolve方法，一个reject方法。
- 通过这两个方法改变，reason和val的值。和padding的状态。
- padding状态只能改变一次。
```angular2
const PADDING = 'PADDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

class promise{
    constructor(executor){
        this.status = PADDING;
        this.val  = '';
        this.reason = '';

        let resolve = (val)=>{
            if(this.status === PADDING){
                this.status = RESOLVE;
                this.val = val
            }
        };

        let reject = (reason)=>{
            if(this.status === PADDING){
                this.status = REJECT;
                this.reason = reason
            }
        };
        try {
            executor(resolve,reject)// new时调
        }catch (e) {
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        //同步
        if(this.status === RESOLVE){
            onFulfilled(this.val)
        }
        if(this.status === REJECT){
            onRejected(this.reason)
        }
    }
}
```
## 步骤二 发布订阅模式（异步的场景）
- 通过setTimeOut(function(){ resolve('success') })模拟异步，此时的then方法中status状态为 padding。
- 通过发布订阅的模式，把成功的回调和失败的回调分别放在各自数组中。

```angular2
class myPromise {
        constructor(executor) {
            this.status = PADDING;
            this.val = undefined;//成功原因
            this.reason = undefined;
            this.onResolveCallbacks = [];//成功回调数组
            this.onRejectcallbacks = [];//失败回调数组
            //成功函数
            let resolve = (val)=>{
               if(this.status === PADDING){
                   this.val = val;
                   this.status = RESOLVE;
                   this.onResolveCallbacks.forEach( fn=>{ fn() })
               }
            };
            //失败函数
            let reject = (reason)=>{
                if(this.status === PADDING){
                    this.reason = reason;
                    this.status = REJECT;
                    this.onRejectcallbacks.forEach( fn=>{ fn() })
                }
            };

            try {
                executor(resolve,reject); //new时候执行
            }catch(error)
            {
                reject(error)

            }
        }
    then(onFulfilled,onRejected){
        //同步的情况
        if(this.status === RESOLVE){
            onFulfilled(this.val)
        }
        if(this.status === REJECT){
            onFulfilled(this.reason)
        }
        console.log('----this.status-',this.status)
        //异步的情况 利用发布订阅
        if(this.status === PADDING){
            //异步先订阅号数据
            this.onResolveCallbacks.push(()=>{
                onFulfilled(this.val)
            });
            console.log('------this.onResolveCallbacks',this.onResolveCallbacks)
            this.onRejectcallbacks.push(()=>{
                onRejected(this.reason)
            });
        }
    }
}
```
### 步骤三 链式调用
- 下一个回调是否调用，依赖于上一个promise的返回结果（成功或失败）。
- 假设如果返回underfind则也会相当于一个成功的promise。
- 假设如果返回throw Error则会返回失败的promise。
- 假设如果return new Promise(function(){})返回空的promise则可以不走成功或者失败的回调，返回一个padding的Promise.
- 每次执行promise都会返回一个新的promise。



- 根据上一个promise的返回结果x，如果x是一个promise调用then。
- 如果x是一个普通的值或者underfind则返回promise一个新的promise。
```

const PADDING = 'PADDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

/**
 * new Promise 时候 让excutor执行，传如一个成功resolve方法，一个reject方法。通过这两个方法改变，reason和val的值。和padding的状态。
 * 状态发生变化后不能改变。
 *
 * promise 链式回调实现方式， 发布订阅。
 */

const resolvePromise = (promise2,x,resolve,reject)=>{

}
class myPromise {
        constructor(executor) {
            this.status = PADDING;
            this.val = undefined;//成功原因
            this.reason = undefined;
            this.onResolveCallbacks = [];//成功回调数组
            this.onRejectcallbacks = [];//失败回调数组
            //成功函数
            let resolve = (val)=>{
               if(this.status === PADDING){
                   this.val = val;
                   this.status = RESOLVE;
                   this.onResolveCallbacks.forEach( fn=>{ fn() })
               }
            };
            //失败函数
            let reject = (reason)=>{
                if(this.status === PADDING){
                    this.reason = reason;
                    this.status = REJECT;
                    this.onRejectcallbacks.forEach( fn=>{ fn() })
                }
            };

            try {
                executor(resolve,reject); //new时候执行
            }catch(error)
            {
                reject(error)

            }
        }

    /**
     * 根据返回值判断then的处理逻辑
     * 1 如果返回promise接着往下执行
     * 2 如果返回成功的promise执行onFulfilled
     * 3 如果返回失败的promise执行onRejected
     * 4 根据上一次返回的值，判断promise2的状态
     * @param onFulfilled
     * @param onRejected
     */
    then(onFulfilled,onRejected){
        let promise2 = new Promise(((resolve, reject) => {
            //同步的情况
            if(this.status === RESOLVE){
                /**
                 * 根据x的值 推导promise2的状态
                 * x可能是普通值
                 * x也可能是promise，接着调用then
                 */
               setTimeout(function () {
                   let x = onFulfilled(this.val);
                   resolvePromise(promise2,x,resolve,reject)
               },0)
            }
            if(this.status === REJECT){
                let x = onFulfilled(this.reason)
            }
            console.log('----this.status-',this.status)
            //异步的情况 利用发布订阅
            if(this.status === PADDING){
                //异步先订阅号数据
                this.onResolveCallbacks.push(()=>{
                    let x = onFulfilled(this.val)
                });
                console.log('------this.onResolveCallbacks',this.onResolveCallbacks)
                this.onRejectcallbacks.push(()=>{
                    let x = onRejected(this.reason)
                });
            }
        }));
    }
}

module.exports = myPromise

```

## promise练习题

- then 正常返回 resolved，里面有报错则返回 rejected。
- catch 正常返回 resolved, 里面有报错则返回 rejected。

```
题目1
const p2 = Promise.resolve().then(()=>{
    throw new Error('error') //会返回rejectred的promise，之后的回调是then
});

题目2
const p3 = Promise.reject('111').catch(()=>{
    console.log('catch');// reject执行完调用catch，catch会返回一个成功的promise，之后可以调用 then
}).then(()=>{
    console.log('111')//
})

题目3
//打印结果 1  2 3
Promise.resolve().then(()=>{
    console.log(1);
    throw new Error('error')
}).catch(()=>{
    console.log(2); // catch之后会返回一个成功的promise
}).then(()=>{
    console.log(3);
})

```

## async /await 和 Promise的关系

- 执行async函数，返回的是Promise对象
- await 相当于 Promise的then
- try...catch可以捕获异常,代替来Promise.catch 
- await后面的内容都是异步的内容

```
//执行aysnc函数,返回的是Promise对象
async function  fn1() {
    return  100; //相当于return Promise.resolve(100);
}
const res = fn1();
res.then((val)=>{
   console.log(val)
});

```

```
async function fn2(){
    const data = await Promise.resolve(3000)
    console.log(data) // 可以打印出300，await相当于 Promise.then的回调
}
```



```
async function fn2(){
    const data = await 3000 //相当于Promise.resolve(3000)
    console.log(data) // 可以打印出300，await相当于 Promise.then的回调
}
```

```
//try catch 相当于 Promise的catch

async function fn3){
    try{
        const res = await Promise.reject('error')
    }catch{
        console.log(res)
    }

}
```

```
async function fn4{
    const res = await Promise.reject('error');
    console.log(res);// 此时的res不会被执行，因为await相当于Promise的then，当reject 时候会执行catch不会执行then，所以此时必须要通过try catch 捕获。
}
```


```
async function async1(){
    console.log('fn start')
    await async2()
    //await后面当作异步代码来执行
    console.log('fn end')
}

console.log('script start');
async1()
console.log('script end');

async function async2(){
    console.log('async2')
}
打印顺序 
script start
fn start
async2
script end
fn end

```


### 场景题分析 

```
async function fn(){
    return 100
}

(async function(){
    const a  = fn();//a的值为 Promise.resolve(100)
    const b  = await fn();// b的值为100，await是promise.resolve的回调
})()    
```

```
(async function(){
    console.log('start')
    const a = await 100
    console.log(a) // a的值为100 
    const b = await Promise.resolve(200)
    console.log(b) // b的值为200
    const c = await Promise.reject(300) //此时会报错因为c是 Promise.resolve()的回调，此时拿不到reject的值，需要使用try catch不然报错。执行不下去了
    console.log(c) 
})()


Promise.resolve().then(() => {
  return new Error('error!!!')// 会返回一个成功的promise，携带这error
 }).then((res) => {
   console.log('then: ', res) // 打印 then:  Error: error!!!
 }).catch((err) => {
   console.log('catch: ', err)
 })
//变换
Promise.resolve().then(() => {
  throw new Error('error!!!')// 
 }).then((res) => {
   console.log('then: ', res) 
 }).catch((err) => {
   console.log('catch: ', err) // 打印 catch:  Error: error!!!
 })






const promise = Promise.resolve().then(() => {
   return promise 
 })
promise.catch(console.error)
// 执行结果如下：
// TypeError: Chaining cycle detected for promise #<Promise>

// .then或 .catch返回的值不能是 promise本身，否则会造成死循环。类似于：

process.nextTick(function tick () {
  console.log('tick')
  process.nextTick(tick)
})


```


## promise.all()

Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
                                              
                                              
- 处理多个promise的状态，当p1，p2都成功时，返回的是 [p1,p2].
- 当p1,p2有一个失败时候，走的是catch 方法，返回的值是第一个reject的值。

```angular2html
let p1 = new Promise((resolve, reject) => {
    resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
    resolve('success')
})

let p3 = Promise.reject('失败')

Promise.all([p1, p2]).then((result) => {
    console.log(result)               //['成功了', 'success']
}).catch((error) => {
    console.log('err',error)
})
```


## Promise.race()

Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。


```angular2html


let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})  

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})

```
