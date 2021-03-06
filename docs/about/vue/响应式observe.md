# 响应式 observe 过程

## 发布订阅模式 VS 观察者模式

个人理解：

- 观察者模式是是观察对象和目标直接进行交互。（数据源直接通知订阅者发生改变。）
- 发布订阅模式是在观察者模式上做的优化，目标和订阅者中间存在一个调度的中间层，由中间层统一控制。（数据源告诉第三方（事件频道）发生了改变，第三方再通知订阅者发生了改变。）
  ![v2-a98ec85570158e7eb8601534984bb22c_1440w.jpg](../../images/v2-a98ec85570158e7eb8601534984bb22c_1440w.jpg)
  ![1492200-20181023200852131-291342969.png](../../images/1492200-20181023200852131-291342969.png)

## 对象侦测

```
    function observer(target){
        if(typeof target !== 'object' || target === null){
            return;
        }
        for(key in target){
            defineReactive(target,key,target[key])
            console.log(key)
        }
    }
    function defineReactive (target,key,val){
        //递归调用
        observer(target[key])
        Object.defineProperty(target,key,{
            get() {
                console.log('get');
                return value;
            },
            set:function (newValue) {
                console.log('set');
                if(newValue !== value){
                    target[key] = newValue;
                }
            }
        })
    }
    let json = {
        name:'kira',
        age:30,
        address:{
            text1:{
                des1:1,
                des2:3
            },
            text2:2
        }
    }
    console.log('json.name',json.name)
    observer(json)
```

## 数组侦测

思路：由于 Object.defindProperty()不具备侦测数组的能力，vue 通过对原生数据方法进行替换，当劫持到 key 是数组类型，通过自定义的数组操作方法覆盖该 key 原型上数组的操作方法。

自定义数组操作方法的实现思路，更新视图，并原生数组操作方法。

```
//重新定义数组原型
const oldArrayProperty = Array.prototype;
//创建新对象 原型指向oldArrayProperty 扩展的新方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
// pop push shift unshift splice
['pop','push','shift','unshift','splice'].forEach(name=>{
    arrProto[name] = function () {
        //更新视图
        updateView();
        //调用原生数组更新方法
        oldArrayProperty[name].call(this,...arguments)
    }
});

function observer(target){
    if(typeof target !== 'object' || target === null){
        return;
    }

    if(Array.isArray(target)){
        target .__proto__ =  arrProto
    }
    for(key in target){
        defineReactive(target,key,target[key])
        console.log(key)
    }
}

function updateView() {
    console.log('更新视图')
}
function defineReactive (target,key,val){
    //递归调用
    observer(target[key]);
    Object.defineProperty(target,key,{
        get() {
            console.log('get');
            return val;
        },
        set:function (newValue) {
            console.log('set');
            if(newValue !== val){
                target[key] = newValue;
            }
        }
    })
}
let json = {
    name:'kira',
    age:30,
    address:{
        text1:{
            des1:1,
            des2:3
        },
        text2:2
    }
};
console.log('json.name',json.name);
observer(json);

```
