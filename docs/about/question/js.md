# js 问题

## underfind 和 null 的区别?

JavaScript 语言居然有两个表示"无"的值：undefined 和 null。
最初设计

- null 是一个表示"无"的对象，转为数值时为 0；
  // Number(null) 0
- undefined 是一个表示"无"的原始值，转为数值时为 NaN。
  // Number(undefined)

## 函数声明式与函数表达式的区别

函数声明式

```angular2html
function 函数名 （参数…）{
    //something...
}
```

函数表达式

函数表达式（Function Expression）是将函数定义为表达是语句的一部分（通常是变量赋值）。通过函数表达式定义的函数是可以命名的，也可以是匿名的。不能以function开头（立即执行函数开头按()算😄）。

```angular2html

//变量a引用了一个匿名函数表达式
var a = function(){
    //something...
}

//变量a引用了一个函数声明式
var a =  function test (){
    //something...
}

//匿名函数表达式
(function test1 () {
    //something...
})();
```

## 针对对象进行从大到小排序

通过sort进行排序

```angular2html
let arr = [
    { id:8,obj:'88'},
    { id:3,obj:'33'},
    { id:4,obj:'44'},
    { id:7,obj:'77'}]

arr.sort(function (a,b) {
    console.log('----a',a.id)
    console.log('----b',b)
    return b.id- a.id;
})
console.log(arr)
```


## js var a = b = c = 10问题？

```angular2html

 function fn(){
    var a = b = c = 10;  
    // 相当于 var a= 10;    b=10;（在全局var b = underfind,在函数内 b=10）   c=10;（在全局var c = underfind,在函数内 c=10)
    
 }
 fn()
 console.log(a) // 报错 a is not defind,因为a是在函数作用定义的。
 console.log(b) // 打印结果10
 console.log(c) // 打印结果10
 // 
```



### null 和 underfind 目前的用法

null 表示"没有对象"，即该处不应该有值。
undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。

- 1 变量被声明了，但没有赋值时，就等于 undefined。
- 2 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
- 3 对象没有赋值的属性，该属性的值为 undefined。
- 4 函数没有返回值时，默认返回 undefined。

这样判断一个值是否存在，就可以用
objA.valueA === undefined // 不应使用 null 因为 undefined == null，而 null 表示该值定义为空值。

```
underfind === null // false
typeof underfind //underdind
typeof null //object
```

### JavaScript 中包含 6 种数据类型？

5 种基本数据类型 1 个复杂数据类型

- underfind
- null
- string
- number
- boolean
- object

### 清除浮动的写法

- 1 overfow:hidden
- 2 元素末尾追加 div.style="clear:both"
- 3 通过伪类

```
.clearfix::after{
    content:'' //伪元素内容 为''让伪元素不显示
    //clear属性只能在块级元素上其作用，这就是清除浮动样式中display:block的作用。
    display:'block',
    height:0让元素高度为0并且不显示
    clear:both;//清除浮动
    visiblity:hidden;//让元素渲染但是不显示
    clear:both;//清除浮动
}
```

```
清除浮动作用

1:解决子元素浮动父元素高度塌陷的问题
```

## 1px 不精准问题？

现象，在高清屏下，移动端的 1px 会很粗。

### 为什么会出现 1px 不精准？

DPR(devicePixelRatio) 设备像素比，它是默认缩放为 100%的情况下，设备像素和 CSS 像素的比值。

目前主流的屏幕 DPR=2 （iPhone 8）,或者 3 （iPhone 8 Plus）。拿 2 倍屏来说，设备的物理像素要实现 1 像素，而 DPR=2，所以 css 像素只能是 0.5。一般设计稿是按照 750 来设计的，它上面的 1px 是以 750 来参照的，而我们写 css 样式是以设备 375 为参照的，所以我们应该写的 0.5px 就好了啊！ 试过了就知道，iOS 8+系统支持，安卓系统不支持。

- window.devicePixelRatio=物理像素 /CSS 像素

### 方法 1 通过 border-img

```angular2
  border: 1px solid transparent;
  border-image: url('./../../image/96.jpg') 2 repeat;
```

### 方法 2 使用 box-shadow 实现

仔细看,能看出这是阴影不是边框。

```angular2
box-shadow: x偏移量 y偏移量 偏移半径 颜色;
box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
            1px  0  1px -1px #e5e5e5,   //右边线
            0  1px  1px -1px #e5e5e5,   //下边线
            -1px 0  1px -1px #e5e5e5;   //左边线
```

### 方法 3 在伪元素中定位，通过 transform 缩放

```angular2
setOnePx{
  position: relative;
  &::after{
    position: absolute;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; /*no*/
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```

### 设置 viewport 的 scale 值

```angular2
<meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<script>
          var viewport = document.querySelector("meta[name=viewport]");
          //下面是根据设备像素设置viewport
          if (window.devicePixelRatio == 1) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
          }
          if (window.devicePixelRatio == 2) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
          }
          if (window.devicePixelRatio == 3) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
          }
          var docEl = document.documentElement;
          var fontsize = 32* (docEl.clientWidth / 750) + 'px';
          docEl.style.fontSize = fontsize;
      </script>
```

## 前端性能监控？

- 通过 performance API 包含了页面加载的各个阶段的起始时间
- window.performance

- 打印 window.performance.timing

```angular2
    timing: {
        navigationStart: 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
        unloadEventStart: 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
        unloadEventEnd: 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
        redirectStart: 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
        redirectEnd: 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
        fetchStart: 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
        domainLookupStart: DNS 域名查询开始的UNIX时间戳,如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
        domainLookupEnd: DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        connectStart: HTTP（TCP） 域名查询结束的时间戳，如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
        connectEnd: HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳，如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
        secureConnectionStart: HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
        requestStart: 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
        responseStart: 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳，如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
        responseEnd: 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
        domLoading: 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
        domInteractive: 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
        domContentLoadedEventStart: 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
        domContentLoadedEventEnd: 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
        domComplete: 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
        loadEventStart: load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
        loadEventEnd: 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0。
}
```

```angular2
// 重定向耗时
redirect: timing.redirectEnd - timing.redirectStart,
// DOM 渲染耗时
dom: timing.domComplete - timing.domLoading,
// 页面加载耗时
load: timing.loadEventEnd - timing.navigationStart,
// 页面卸载耗时
unload: timing.unloadEventEnd - timing.unloadEventStart,
// 请求耗时
request: timing.responseEnd - timing.requestStart,
// 获取性能信息时当前时间
time: new Date().getTime(),

//白屏时间指从输入网址，到页面开始显示内容的时间。
<script>
    let whiteScreen = new Date() - performance.timing.navigationStart
</script>
```

## js 实现一个单例模式

思路：保证一个类只有一个对象，一般先判断对象是否存在，如果存在直接返回该对象。如果不存在，创建对象并返回。
比如后台的 jdbc 连接就是典型的单例，防止每次使用 sql 都要创建 sql 连接对象。

## requestAnimationFrame 对比 setTimeOut

- 没有办法保证，回调函数一定会在 setTimeout()指定的时间执行。
- 把浏览器切换到后台，setTimeOut 还会一直执行。
- 在页面渲染结束后才会开始执行。
- requestAnimationFrame 执行时机早，在重绘阶段 就开始执行了。
- 动画更加流畅 60 帧/s，既 16.67ms 更新一次视图。这个时机是符合人眼的。频率是自己定的
- setTimeOut 手动设置多少毫秒增加多少像素，requestAnimationFrame 自动控制.
  setTimeOut 手动设置时间来执行，如果手动设置 setTimeOut(fn,0)执行代码前等待的毫秒数为 0，但并不是立即执行的，这是因为 setTimeout 有一个最小执行时间。

HTML5 标准规定了 setTimeout()的第二个参数的最小值（最短间隔）不得低于 4 毫秒。实际上可能为 4 毫秒后才事件推入任务队列。如果此时主线程不为空，也不会读取推出异步队列的 setTimeOut.

执行效率问题

```
虽然两段代码执行效果一样，但是第二段代码(16.7ms/3)就要执行一次函数，很浪费性能。
如果每次增加10或者更大，使用setTimeOut会有明显卡顿卡。
let currentWidth = 100
const maxWidth = 640
function animate()
    currentWidth + = 3;
    if(currentWidth<maxWidth){
        $div.css('left',currentWidth)
        setTimeOut(animate,16.7)
    }
}
animate();

//假设我们让每次增加1px
let currentWidth = 100
const maxWidth = 640
function animate()
    currentWidth + = 1;//每次增加1px
    if(currentWidth<maxWidth){
        $div.css('left',currentWidth)
        setTimeOut(animate,16.7/3) //增加setTimeOut的执行频率
    }
}
animate();
```

## AMD 和 CMD 的区别？

- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

- 1 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。
- 2 CMD 推崇依赖就近，AMD 推崇依赖前置。

## DocumentFragement VS Document

for in 对比 for of

- 区别:DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。

DocumentFragment 节点代表一个文档的片段，本身是一个完整的 DOM 树结构。它没有父节点，不属于 Document。但是可以插入任意数量的子节点。但是它不属于当前文档。比直接操作 DOM 树快。

```
//简单使用
var carInfoEl = document.querySelector('.car-info')
const fragment = document.createDocumentFragment() //创建fragement
carDetail.carInfo.map(item => {
      var li = document.createElement('li')
      li.innerHTML = '<span class="key">' + item.split(':')[0] + '</span > <span span class="value" >' + item.split(':')[1] + '</span>'
      fragment.appendChild(li)//把真实DOM append到 fragement上
})
carInfoEl.appendChild(fragment) //把fragement添加到真实DOM上。
```

## 在前端如何处理几万条数据的情况？

通过使用 DocumentFragement。存储每次要插入的文档。
使用 requestAnimationFragement 动态 在真实 DOM 上添加 fragement。

```
    setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    // 添加数据的方法
    function add() {
        const fragment = document.createDocumentFragment();
        for(let i = 0; i < once; i++) {
        const li = document.createElement('li');
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
    }
    function loop() {
        if(countOfRender < loopCount) {
        window.requestAnimationFrame(add);
        }
    }
    loop();
    }, 0)

```

## Promise 状态不能被二次改变问题

```
new Promise(function(resolve,reject){
    resoleve()
    throw Error('error')
}).then(function(){
    console.log('resolve')
}).catch(function(){
    console.log('err')
})
//打印结果 resolve
throw Error 并不会触发 catch 的执行
```

## 原型链问题

此题考察的是对原型链继承关系的理解，和对 new 的认识。

```
Object.prototype.a = function(){
    console.log('object')
}
Function.prototype.a = function(){
    consoloe.log('function')
}
function A(){

}

let a = new A();
a.a(); // 打印结果是 object，找的是Object上的a
因为 我们new A();首先a会在 构造函数上找，构造函数上找不到。
new的过程
1创建空对象{}
2把a的原型链指向Object
```

## js 模块的导出和引入

- 1 在 js 模块中通过 import 导入其他文件 import xxx from '路径地址'
- 2 导出分为两种导出方式 export 和 export default

export 具名导出

```angular2
//文件1
//第一个js文件
这种导出方式在导入的时候名字必须与导出名字一致，并且导出多个数据的时候必须写成对象的形式，然后我们在第二个js文件中通过下面代码导入第一个js文件
var name = "名字";
function fun(){
    alert("肉弹葱鸡")
}
export {name,fun}

//第二个js文件
import {name,fun} from '第一个js文件路径'
```

export default（匿名导出）

匿名导出只能导出一次。

```angular2
class Person{
    constructor(name){
        this.name = name;
    }
    say(){
        alert(this.name)
    }
}

export default Person //将Person匿名导出

import Person from '上面文件路径'
```

## 函数提升和变量提升

- 函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被变量赋值后覆盖

变量提升

```angular2html

console.log(foo); // undefined
var foo = 'kira';
console.log(foo)  // kira

//相当于

var foo
console.log(foo)
foo = 'kira'
console.log(foo
)
```

函数提升

```angular2html

function foo () {
    // to do...
}

//相当于

var foo = function(){
    // to do ...
}
```

```angular2html

console.log(bar);  // f bar() { console.log(123) }
console.log(bar()); // undefined
var bar = 456;
function bar() {
    console.log(123); // 123
}
console.log(bar); // 456
bar = 789;
console.log(bar); // 789
console.log(bar()) // bar is not a function

//相当于

var bar = function(){
    console.log(123)
}
var bar;

bar = 456;

console.log(bar) // 456
bar = 789
console.log(bar) // 789
console.log(bar()) //bar is not function


```




## 小程序 navigateTo()和 redirectTo()用法和区别

- navigateTo 路由跳转
- A 页面 redirectTo B 页面，会把 A 在历史记录栈里清掉，在跳转到 B 页面。

## for in 对比 for of

### for-in 是为普通对象设计的

### for-of 遍历数组更加方便


##  通过url获取参数

```angular2html

function query(name){
    const search = location.search
    const params = search.URLSearchParams(search)
    return params.get(name)
}

```


## 把url参数转为JSON

```angular2html

function queryToJSON(){
    const json = {}
    let url= location.search.substr('1')//获取url
    url.split('&').forEach((item)=>{
        //分隔每一项
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]
        json[key] = value
    })

    return json
}
query()

```



