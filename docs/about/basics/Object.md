# Object


## Object.create


Object.create 创建一个对象并把这个对象的 [[Prototype]] 关联到指定的对象。

Object.create(proto, [propertiesObject])

- proto : 必须。表示新建对象的原型对象，该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
- propertiesObject :  添加到新创建对象的可枚举属性。

```angular2html
let a = Object.create({name:'kira',info:{value:'111'}})

console.log(a) //{info:'111'}
console.log(a.__proto__) //打印结果{name:'kira'}
console.log(a.__proto__.__proto__) //打印结果是Object的内容





```
### Object.create 和 {} 区别

- Object.create自定义自己的原型
- Object.create(null); //{} 没有原型

```angular2html
let a = {}
console.log(a);// {}
consloe.log(a.__proto__)//打印的是Object的内容 
```

```$xslt
var anotherObject = { a:2};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );
myObject.a; // 2 实际上就是把a:2 挂载到了myObject上
```


## Object.assign 的用法

Object.assign 可以实现对象的合并。Object.assign(target, ...sources)

### 同名属性 source 替换 targe 属性

Object.assign()方法只会合并替换对象的第一层 key，对于多层的，会当做值处理。(即 Object.assign 是浅拷贝的合并)

Object.assign 会将 source 里面的可枚举属性复制到 target。如果和 target 的已有属性重名，则会覆盖。同时后续的 source 会覆盖前面的 source 的同名属性。

```
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

```
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

```

let a = { a: {age:25}, b: 2, c: {}}
let b = { c: 3, a: { name: 'kira' },f: {} };


function mergeDeep(a,b) {
    for (key in b) {
        if (a[key] && a[key].toString() === '[object Object]' ) {
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

```angular2html
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


```angular2html
let a = {name:'kira',info:{age:25}}
let b = Object.assign({},a)
a.name = '123'
a.info.age = 23
console.log(a) //{name:'123',info:{age:23}}
console.log(b)//{name:'kira',info:{age:23}}

```

### 两个对象之间的比较

```angular2html
let a = {a:1}
let b = {a:1}
let c = new Object(a)
console.log(a === b) // false 两个对象在堆中的指针地址不同

console.log(a === c) // true 两个对象的指针地址相同
```




