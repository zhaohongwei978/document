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

