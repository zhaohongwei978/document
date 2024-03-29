# Object

## Object.create

Object.create 创建一个对象并把这个对象的 [[Prototype]] 关联到指定的对象。

Object.create(proto, [propertiesObject])

- proto : 必须。表示新建对象的原型对象，该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
- propertiesObject :  添加到新创建对象的可枚举属性。

```javascript
let a = Object.create({name:'kira',info:{value:'111'}})

console.log(a) // {}
console.log(a.__proto__) //打印结果{name:'kira'},info:{value:'111'}}
console.log(a.__proto__.__proto__) //打印结果是Object的内容

//利用Object.create的第二个参数，给创建的新对象增加属性

let obj = {name:1}
//新增加的属性必须有enumerable属性，不然在新创建的对象上找不到。
let c = Object.create(obj,{age: { value: 24,enumerable: true,}})

console.log(c) // {age:24}
console.log(c.__proto__) // {name:1}
console.log(c.__proto__.__proto__) // {name:1}



```
### Object.create 和 {} 区别

- Object.create自定义自己的原型
- Object.create(null); //{} 没有原型

```javascript
let a = {}
console.log(a);// {}
consloe.log(a.__proto__)//打印的是Object的内容 
```

```javascript
var anotherObject = { a:2};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );
myObject.a; // 2 实际上就是把a:2 挂载到了myObject上
```


### Object.create的简单实现 

```js

//方法1 
Object.create1 = function (proto){
     if (typeof proto !== "object" && typeof proto !== "function") {
        // 类型校验
        throw new TypeError("proto必须为对象或者函数");
    } else if (proto === null) {
        // null 特殊处理
        throw new Error("不支持传递null");
    }

    let obj = {};
    //IE下兼容性不好.__proto__不推荐
    obj.__proto__ = proto
    return obj;
}
//方法2
Object.create1 = function (proto){
    if (typeof proto !== "object" && typeof proto !== "function") {
        // 类型校验
        throw new TypeError("proto必须为对象或者函数");
    } else if (proto === null) {
        // null 特殊处理
        throw new Error("不支持传递null");
    }
    //构造函数
    function F(){}
    //更改prototype
    F.prototype = proto;
    //生成构造函数的实例
    return new F();
}
```
### Object.create 一些问题

```javascript
const fatherObj = {name:'father',age:20}
let obj = Object.create(fatherObj,{test:{value:1,enumerable:true,writable:true}})
console.log(obj)//{test:1}
console.log(obj.__proto__) //{ name: 'father', age: 20 }

obj.test++;
console.log(obj)//{test:2}

obj.age++;
console.log(obj)//test:2,age:21}
console.log(obj.__proto__) //{ name: 'father', age: 20 }

//fatherObj.age = 33;
console.log(obj)//test:2,age:21}
console.log(obj.__proto__) //{ name: 'father', age: 33 }

```
## Object.assign 的用法

Object.assign 可以实现对象的合并。Object.assign(target, ...sources)

### 同名属性 source 替换 targe 属性

Object.assign()方法只会合并替换对象的第一层 key，对于多层的，会当做值处理。(即 Object.assign 是浅拷贝的合并)

Object.assign 会将 source 里面的可枚举属性复制到 target。如果和 target 的已有属性重名，则会覆盖。同时后续的 source 会覆盖前面的 source 的同名属性。

```javascript
let obj1 = {
  a: {
    b: {
      c: "111"
    }
  }
};

let obj2 = {
  a: {
    b: {
      d: "222"
    }
  }
};
Object.assign(obj1, obj2);
//输出结果
a: {
    b: {
      d: "222"
    }
}
```

### object.assign 浅拷贝问题

Object.assign 只能拷贝第一层。

```javascript
let a = {a:1,b:2}
let b= {c:3,d:{name:'kira'}};

let obj = Object.assign({},a,b);
console.log(obj);
//{ a: 1, b: 2, c: 3, d: { name: 'kira' } }

a.a = 66;
console.log(obj); //修改a发现obj并没有被改变。
// { a: 1, b: 2, c: 3, d: { name: 'kira' } }
b.d.name = 'test';
console.log(obj);//修改name时候，发现obj被改变了。
//{ a: 1, b: 2, c: 3, d: { name: 'test' } }
c



```

### 深拷贝实现 merge

```js

let a = { a: {age:25}, b: 2, c: {}}
let b = { c: 3, a: { name: 'kira' },f: {} };


function mergeDeep(a,b) {
    for (let key in b) {
        if (a[key] && String(a[key]) === '[object Object]' ) {
            mergeDeep(a[key],b[key])
        } else {
            a[key] = b[key];
        }
    }
}
mergeDeep(a, b)
console.log('----a',a)

```


### 深比较判断两个对象是否相等

```javascript
const a = {a:10,b:{c:10,d:20}}
const b = {a:10,b:{c:10,d:20}}
//
function isEqual(a,b) {
    let result = true ;
    for (let key in b){
        if(a[key] === undefined){
            result = false
        }
        if(typeof b[key] == 'object' && b[key]!==null){
            const res =  isEqual(a[key],b[key])
            if(res === false) return  false;
        }else{
            if (a[key] !== b[key]){
                result = false
            }
        }
        console.log('11',result)
    }
    return result;
}

```

### 什么是浅拷贝

新建一个对象，这个对象有原始对象属性值的一份精确拷贝。

**<font color="red">浅拷贝只拷贝一层，如果属性是基本数据类型就拷贝值。如果属性是引用类型就拷贝地址。</font>**


```javascript
let a = {name:'kira',info:{age:25}}
let b = Object.assign({},a)
a.name = '123'
a.info.age = 23
console.log(a) //{name:'123',info:{age:23}}
console.log(b)//{name:'kira',info:{age:23}}

```

### 两个对象之间的比较

```javascript
let a = {a:1}
let b = {a:1}
let c = new Object(a)
console.log(a === b) // false 两个对象在堆中的指针地址不同

console.log(a === c) // true 两个对象的指针地址相同
```