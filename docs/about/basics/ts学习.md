## ts 学习

## 静态类型语言 vs 动态类型语言

- 静态类型语言： 在编译阶段确定所有变量的类型
- 动态类型语言: 在执行阶段确定所有变量的类型

静态类型语言

在编译阶段确定所有变量的数据类型。

- 对类型极度严格
- 立即发现错误
- 运行时性能好

动态类型语言

在执行阶段才能确定变量的数据类型。

- 对类型比较宽松
- bug 隐藏时间长
- 可读性差
- 动态语言性能可以改善 语言灵活度高 隐秘的错误可以通过单元测试发现 文档可以通过工具生成。

## 使用 ts

- 1 npm i typescript -g 全局安装 ts
- 2 tsc --init 创建 tsconfig.json 文件。

### 原始数据类型

- let bool:boolean = true
- let num:number = 123
- let str:string = "123"

### 数组

- let arr1:number[] = [1,2,3]
- let arr2:Array<number|string> = [1,2,'3']

### 元组 不能改变数据类型和个数

```
let tuple:[number,string] = [1,'2']
tuple.push(3)
//虽然元组可以往里push元素，但是在实际的开发过程中是不建议这么操作的，并且push进去的值 不允许访问。
console.log(tuple) //打印结果[1,'2',3]
tuple[2] // 报错 push进去的值不允许访问
```

//函数
let add = (x:number,y:number) number =x +y

//对象
let obj:object = {x:1,y:2}
let obj:{x:number,y:number} = {x:1,y:2}

//symbol
let s1:symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2 ) //false

//underfind,null
let test1:unserfind = underfind
let test2:null = null

//never 类型

let error =()=>{
throw new Error('error')
}

let endless = ()=>{
//死循环 never 类型
while(true){

}
}

### ES6 数据类型

- Boolean Number String Array Function Object Symbal underfind null

### TS 数据类型

- Boolean Number String Array Function Object Symbal underfind null
- void any never 元祖 枚举 高级类型

### 类的概念

```
class Dog{
    name: string;
    constructor(name:string){
        this.name = name;
    }
    run(){

    }
}
let dog = new Dog('kira')
console.log(Dog.prototype) //打印类的原型
//{run: ƒ, constructor: ƒ}
console.log(dog)//打印类的实例，发现属性挂在实例上。
//Dog {name: "kira"}
```

### 类成员修饰符

- public 默认
- private
- static
- readonly
- protected

#### private 特性

- 1 private 定义的变量，只能通过 Dog 类访问
- 2 实例不能访问 private 修饰的变量
- 3 子类 super 不能调用父类 private 修饰的变量
- 4 如果用 private 修饰 constructor 该类既不能被继承 也不能被实例化。

```
class Dog{
    private name: string;
    constructor(name:string){
        this.name = name;
    }
     run(){
        console.log('run=====')
    }
}
console.log(Dog.name);//正常
console.log(dog.name);//
//Property 'name' is private and only accessible within class 'Dog'.


class TT extends Dog{
    color:string
    constructor(name:string,color:string){
        super(name)
        this.color = color;
    }
    getColor(){
        super.name//报错
        return this.color;
    }
}


```

#### protected 特性

- protected 受保护的，受保护的成员只能在类中或者子类中访问，不能在实例中访问。
- protected 修饰 constructor，表示该类不能被实例化，只能被继承。

```
class Dog{
    protected name: string;
    constructor(name:string){
        this.name = name;
    }
     run(){
        console.log('run=====')
    }
}

let dog = new Dog('kira')
console.log('dog',Dog.name) // 正常访问
console.log('dog',dog.name) // 报错，protected成员不能在实例中访问

class TT extends Dog{
    color:string
    constructor(name:string,color:string){
        super(name)//子类可以正常访问受保护成员
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}

```

#### readonly 特性

- 1 必须被初始化
- 2 只读不能被修改

#### static 特性

- 静态成员 可以被继承
- 静态成员 只能通过类名调用
- 实例对象 不能调用到静态成员

```
class Dog{
    static test: string = ''; //静态成员
    constructor(){
    }
     run(){
        console.log('run=====')
    }
}

let dog = new Dog()
console.log('dog',Dog.test) //可以调用
console.log('dog',dog.test) //实例不可以调用 会报错。

class TT extends Dog{
    color:string
    constructor(name:string,color:string){
        super()
        console.log(super.test) //不可以调用
        console.log(TT.test) // 可以通过子类调用
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}
```
