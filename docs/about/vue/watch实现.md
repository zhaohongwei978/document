# watch 实现

## watch 的使用

```
//深度观测
深度观测浪费性能，避免深度观测数据。尽量让数据的层次更浅一些。或者watch某一个key
obj:{
    handler(newValue, oldValue) {
        //do something
        console.log(newValue,oldValue)
    },
    deep:true
}

//立即执行
obj:{
    handler(newValue, oldValue) {
        //do something
        console.log(newValue,oldValue)
        },
        deep:true,
        immediate: true
}
//观测对象中的某个属性
"obj.acount":{
    handler(newValue, oldValue) {
        //do something
        console.log(newValue,oldValue)
    },
    deep:true,
    immediate: true
```

Object.defineProperty 实现 watch
思路：Object.defineProperty 对 data 侦测，获取数据调用 getter，修改数据调用 setter 并触发 watch 的回调函数。
