# map&&set

## Map 和 WeakMap区别

- Map的key是任意的, WeakMap的key只能是Object（null除外）
- *Map的key是跟内存地址绑定的（强引用），WeakMap是弱引用，键所指向的对象可以被垃圾回收
- Map可以被遍历，WeakMap不可。

通过执行如下code，dom元素被从tree上删除了。

```js
const map = new Map();
const dom = document.querySelector('#login')
m.set(dom,{disable:false});
```

