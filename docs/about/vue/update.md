# vue 更新

update 过程就是把虚拟 dom 转化为真实 dom 的过程。

### update 的触发场景

一个是首次渲染，一个是数据更新的时候。

Vue.prototype.**patch** = inBrowser ? patch : noop

\_update 的核心就是调用 vm.**patch** 方法，这个方法实际上在不同的平台，比如 web 和 weex 上的定义是不一样的

web 平台上，是否是服务端渲染也会对这个方法产生影响。因为在服务端渲染中，没有真实的浏览器 DOM 环境，所以不需要把 VNode 最终转换成 DOM。因此是一个空函数，而在浏览器端渲染中，它指向了 patch 方法，该方法的定义是调用 createPatchFunction 方法的返回值，这里传入了一个对象，包含 nodeOps 参数和 modules 参数。其中，nodeOps 封装了一系列 DOM 操作的方法，modules 定义了一些模块的钩子函数的实现
