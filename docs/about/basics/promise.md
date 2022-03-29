# promise

## 关键点

- 1 promise状态只允许改变一次
- 2 发布订阅模式解决，异步场景改变resolve/reject状态,执行不到.then
- 3 链式回调问题，通过让.then返回一个全新的promise对象来解决链式回调

### 一 标志位只能改变一次

- new Promise 时候 让excutor执行，传如一个成功resolve方法，一个reject方法。
- 通过这两个方法改变，reason和val的值。和padding的状态。
- 关键点 relsove 和 reject的执行需要判断 当前是PENDING状态。

```javascript
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

### 二 发布订阅

通过setTimeOut(function(){ resolve('success') })模拟异步，此时的then方法中status状态为 PENDING。如果.then中状态为PENDING，把成功和失败的会调函数fn都放在一个数组中，当执行reove/reject方法时，让数组中的fn批量执行。

```javascript
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

### 三 链式调用

链式回调问题主要通过在.then中返回一个全新的Promise。
（必须是全新的promise，因为如果返回this，此时的promise状态已经被改变，所以不能继续使用）

.then返回的几种情况

- 1 返回一个成功/失败的promise对象，下一个then根据promise状态接收
- 2 返回一个普通值，下一个then根据成功的状态接收
- 3 如果抛出错误 下一个then根据失败的状态接收

<!-- - 下一个回调是否调用，依赖于上一个promise的返回结果（成功或失败）。
- 假设如果返回underfind则也会相当于一个成功的promise。
- 假设如果返回throw Error则会返回失败的promise。
- 假设如果return new Promise(function(){})返回空的promise则可以不走成功或者失败的回调，返回一个padding的Promise.
- 每次执行promise都会返回一个新的promise。 -->

- 根据上一个promise的返回结果x，如果x是一个promise调用then。
- 如果x是一个普通的值或者underfind则返回promise一个新的promise。

```javascript

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

```javascript
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

```javascript
//执行aysnc函数,返回的是Promise对象
async function  fn1() {
    return  100; //相当于return Promise.resolve(100);
}
const res = fn1();
res.then((val)=>{
   console.log(val)
});

```

```js
async function fn2(){
    const data = await Promise.resolve(3000)
    console.log(data) // 可以打印出300，await相当于 Promise.then的回调
}
```

```js
async function fn2(){
    const data = await 3000 //相当于Promise.resolve(3000)
    console.log(data) // 可以打印出300，await相当于 Promise.then的回调
}
```

```js
//try catch 相当于 Promise的catch

async function fn3){
    try{
        const res = await Promise.reject('error')
    }catch{
        console.log(res)
    }

}
```

```js
async function fn4{
    const res = await Promise.reject('error');
    console.log(res);// 此时的res不会被执行，因为await相当于Promise的then，当reject 时候会执行catch不会执行then，所以此时必须要通过try catch 捕获。
}
```

```javascript
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

```javascript
// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

function run (callback,delay){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
    resolve('run');
    callback();
    },delay)
    })
}
function fn(){
    Promise.resolve().then(()=>{
    return run(red,3000)
    }).then(()=>{
    return run(green,2000)
    }).then(()=>{
    return run(yellow,1000)
    }).then(()=>{
        fn();
    })
}
fn();
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function fn(){
    return 100
}

(async function(){
    const a  = fn();//a的值为 Promise.resolve(100)
    const b  = await fn();// b的值为100，await是promise.resolve的回调
})()    
```

```javascript
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

## promise.all()使用

Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

- 处理多个promise的状态，当p1，p2都成功时，返回的是 [p1,p2].
- 当p1,p2有一个失败时候，走的是catch 方法，返回的值是第一个reject的值。

```javascript
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

## promise.all()实现

```javascript
Promise.myAll = function (promiseArr){
    return new Promise((resolve, reject) => {
        let len = promiseArr.length;
        let result = new Array(len);
        let count = 0;
        for (let i=0;i<promiseArr.length;i++){
            Promise.resolve(promiseArr[i]).then((res)=>{
                count ++;
                result[i] = res;
                if(len ===count){
                    return resolve(result)
                }
            }).catch((error)=>{
                return reject(error)
            })
        }
    })
}

Promise.myAll([promise1,promise2]).then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})

```

## Promise.race()

Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
Promise.race的结果只参照第一个改变状态的Promise，第一个为成功它就成功，第一个失败它就跟着失败，非常冷酷无情。

```javascript
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

## Promise.race()实现

```javascript
Promise.myRace = function (promiseArr){
    let len = promiseArr.length;
    return new Promise(function (resolve, reject){
        for (let i=0;i<len;i++){
            Promise.resolve(promiseArr[i]).then(function (){
                return resolve(promiseArr[i])
            }).catch(function (error){
                return reject(promiseArr[i])
            })
        }
    })
}

```

## promisify 

把一个普通的函数包装成promisify对象
```javascript
const fs = require('fs');
function promisify (original){
    return function(...args){
        return new Promise((resolve, reject) => {
            // 将 arguments 里面新增一个 original 的 callback，用来改变 promise 的状态
            args.push(function callback(err, ...values) {
                console.log('args',err,...values)
                if (err) {
                    return reject(err);
                }
                return resolve(...values)
            });
            console.log('---args',args)
           //  执行原函数(args 已经新增了 callback 了)
            original.call(this, ...args);
        });
    }
}
const readFile = promisify(fs.readFile)
readFile('./test.js').then(()=>{
    console.log('fff')
})


function instanceof (left,right){
    let l = l.__proto__;
    let r = r.prototype;
    while(true){
        if(l === r) return true;
        if(l=== null) return false;
        l = l.__proto__;
    }
}
```


