# generator 

生成器函数，主要作用就是可以暂停，我们利用yield的暂停机制，可以去获取接口。等接口返回数据在yield.next（）接着往下执行。

不使用async await

```angular2
//如果不使用async await想要实现异步调用，就需要嵌套。
$ajax('url',function(){
    $('ajax',function(){
})
})
```

使用generator实现 async函数
await相当于是返回的的promise包裹的对象。

```angular2
async function a(){
    
    await ajax.('url') // 等待一个请求的返回结果，await会返回一个promise对象
    console.log('111') // 当拿到返回结果时候 yield.next才会执行await之后的函数。
}

function *函数(){
    yiled ajax('xxx')
    console.log('111')
}
```

