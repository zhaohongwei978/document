# vue 实例挂载

## 获取 render

思路：vue 只认 render 函数，如果存在 render 函数直接使用，如果 render 函数不存在，找到 template 把 template 编译成 render 函数。

```
//缓存了原型上的 $mount 方法
const mount = Vue.prototype.$mount
//重新定义mount方法
Vue.prototype.$mount = function (
 el?: string | Element,
 hydrating?: boolean
): Component {
 el = el && query(el)
//vue不能直接挂在body或者html上
 /* istanbul ignore if */
 if (el === document.body || el === document.documentElement) {
   process.env.NODE_ENV !== 'production' && warn(
     `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
   )
   return this
 }

 const options = this.$options
 // resolve template/el and convert to render function
 //如果没有定义render方法
 if (!options.render) {
   //获取到template字符串
   let template = options.template
   if (template) {
     if (typeof template === 'string') {
       if (template.charAt(0) === '#') {
         template = idToTemplate(template)
         /* istanbul ignore if */
         if (process.env.NODE_ENV !== 'production' && !template) {
           warn(
             `Template element not found or is empty: ${options.template}`,
             this
           )
         }
       }
     } else if (template.nodeType) {
       template = template.innerHTML
     } else {
       if (process.env.NODE_ENV !== 'production') {
         warn('invalid template option:' + template, this)
       }
       return this
     }
   } else if (el) {
     template = getOuterHTML(el)
   }
   if (template) {
     /* istanbul ignore if */
     if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
       mark('compile')
     }
    //compileToFunctions 把template转化为render方法
     const { render, staticRenderFns } = compileToFunctions(template, {
       shouldDecodeNewlines,
       shouldDecodeNewlinesForHref,
       delimiters: options.delimiters,
       comments: options.comments
     }, this)
     options.render = render
     options.staticRenderFns = staticRenderFns

     /* istanbul ignore if */
     if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
       mark('compile end')
       measure(`vue ${this._name} compile`, 'compile', 'compile end')
     }
   }
 }
 //调用原型本身的mount挂载方法
 return mount.call(this, el, hydrating)
}
```

## \$mount 把 render 函数挂载

\$mount  方法支持传入 2 个参数，

- 第一个是  el，它表示挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调用  query  方法转换成 DOM 对象的。
- 第二个参数是和服务端渲染相关，在浏览器环境下我们不需要传第二个参数。

\$mount 方法实际上会去调用 「mountComponent」 方法（完成整个渲染过程）

mountComponent 核心就是先调用 vm.\_render 方法先生成虚拟 Node，再实例化一个渲染 Watcher，在它的回调函数中会调用 updateComponent 方法，最终调用 vm.\_update 更新 DOM。Watcher 在这里起到两个作用，一个是初始化的时候会执行回调函数，另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数，这块儿我们会在之后的章节中介绍。函数最后判断为根节点的时候设置 vm.\_isMounted 为 true，表示这个实例已经挂载了，同时执行 mounted 钩子函数。这里注意 vm.\$vnode 表示 Vue 实例的父虚拟 Node，所以它为 Null 则表示当前是根 Vue 的实例。
