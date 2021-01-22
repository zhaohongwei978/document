# new 的过程

- 1 创建空对象
- 2this 指向新对象，执行构造函数的代码。
- 3 设置原型链，新对象**proto** 指向构造函数的 prototype
- 4 判断传入对象类型是否一个对象，是则返回新对象 否则直接返回。

```
1 创建一个空对象
2 新对象继承Person.prototype
3 使用指定的参数调用构造函数 Person ，并将 this 绑定到新创建的对象
4 返回最初创建的对象
function myNew(Fn,args) {
    let obj = {};//创建一个空对象
    if(Fn && typeof Fn === "function"){
        obj.__proto__ = Fn.prototype;
        obj.call(Fn,...args);
        return obj;
    }
}
```
