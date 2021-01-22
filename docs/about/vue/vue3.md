# vue3

## Objecjt.defineProperty

- 深度监听 需要一次性递归
- 无法监听新增/删除属性(Vue.set Vue.delete)
- 无法原生监听数组，需要特殊处理

this.a = 1 //新增属性监听不到
delete this.a //删除属性

```
const proxyData = new Proxy(data,{
    get(target,key,receiver){
        const result = Reflect.get(target,key,receiver)
        return result
    },
    set(target,key,val,receiver){
        const result = Reflect.set(target,key,val,receiver)
    },
    deleteProperty(target,key){
        const result = Reflect.deleteProperty(target,key)
        return result;
    }
})
```

## setup 函数

- setup()新语法，写了这个就不需要再写 data methods 这样的东西了。
- setup() :开始创建组件之前，在 beforeCreate 和 created 之前执行。创建的是 data 和 method

```
setup(){
    //在setup中定义变量
    const girls = ref(['11','22','333']);
    const selectGirl = ref('');
    //在setup中定义方法
    const clickMe = (index: number,item: object)=>{
        selectGirl.value = girls.value[index]
    };
    //在setup中暴露方法和变量
    return{
      girls,
      selectGirl,
      clickMe
    }
}
```

## reactive 函数

- reactive 和 ref 都是为了定义响应式的数据。

```
interface DataProps {
  girls: string[];
  selectGirl: string;
  clickMe: (index: number) => void;

}
export default defineComponent({
  name: 'Home',
  setup(){
    const data: DataProps = reactive({
      girls:['11','22','333'],
      selectGirl:'',
      clickMe:(index: number)=>{
       data.selectGirl = data.girls[index]
      }
    });
    //使用toRefs目的是为了解构赋值，如果直接通过...获取属性
    const refData = toRefs(data);
    return{
      ...refData
    }
  }
});
```

## 生命周期

```
- setup() :开始创建组件之前，在 beforeCreate 和 created 之前执行。创建的是 data 和 method。在 vue3 中 setup 生命周期替代了 beforeCreate 和 created。

- onBeforeMount() : 组件挂载到节点上之前执行的函数。
- onMounted() : 组件挂载完成后执行的函数。
- onBeforeUpdate(): 组件更新之前执行的函数。
- onUpdated(): 组件更新完成之后执行的函数。
- onBeforeUnmount(): 组件卸载之前执行的函数。
- nUnmounted(): 组件卸载完成后执行的函数
- onActivated(): 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。
- onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行。
- onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数（以后用到再讲，不好展现）。
```
