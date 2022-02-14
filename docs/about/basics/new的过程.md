# new 的过程


## 一句话说下new到底做了什么？

    将构造函数生成它的实例。
    new 运算符创建一个用户定义的对象类型的实例 该实例对象继承自构造函数。

## new操作符的使用

```js
function Fn (name, age) {
    this.name = name;
    this.age = age;
}
Fn.prototype.toPlay = function (){
    console.log('to play');
}

const fn = new Fn('zhangsan',12);
console.log(fn)// Fn{name:'zhangsan',age:'12'}

```
## new的返回值

 默认情况下new操作符号是返回是实例化后的对象的，如果自己指定一个对象类型返回，则返回自己指定的对象，若为 string/null/number/boolean等类型的返回则依然返回自己指定的对象。
 所以在仿源码中会有如下判断（return typeof result === 'object' ? result : obj）

```js
function Fn (name, age) {
    this.name = name;
    this.age = age;
    return {test:'111'}
}
Fn.prototype.toPlay = function (){
    console.log('to play');
}

const fn = new Fn('zhangsan',12);
console.log(fn)// {test:'111'}

```
## 实现一个new的方法
```javascript
1 创建一个空对象
2 新对象继承Person.prototype
3 使用指定的参数调用构造函数 Person ，并将 this 绑定到新创建的对象
4 返回最初创建的对象
//方法1 
function myNew(Fn,args) {
    let obj = {};//创建一个空对象
    if(Fn && typeof Fn === "function"){
        obj.__proto__ = Fn.prototype;
        obj.call(Fn,...args);
        return obj;
    }
}

function fn(name,age){
    this.name = name;
    this.age = age;
}


//方法2
function myNew(constructor,...args){
    const obj = Object.create(constructor.prototype);
    let result = constructor.apply(obj,args)
    return typeof result === 'object' ? result : obj
}
let obj = myNew2(fn,'kira','12');


```
