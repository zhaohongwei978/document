# react相关

## react 函数调用时this的指向

### 在constructor中给函数绑定this

```javascript
import * as React from "react";
export  default  class EventTest extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'kira'
        }
        
        //constructor只会执行一次bind绑定也只会发生一次
        this.myClick = this.myClick.bind(this)
    }
    myClick = ()=>{
        console.log('---',this.state.name)
    }
    render() {
        return(
            <div onClick={this.myClick}>
                button
            </div>
        )
    }
}

```


### 在jsx中给事件绑定this

问题，但是每次函数调用时候都会进行bind绑定，效率不高
```javascript
 render() {
    return(
        <div onClick={this.myClick.bind(this)}>
            button
        </div>
    )
}

```

### 通过箭头函数绑定this

问题，但是每次函数调用时候都会进行bind绑定，效率不高
```javascript
//箭头函数
myClick = ()=>{
        console.log('---',this.state.name)
}
render() {
    return(
        <div onClick={this.myClick}>
            button
        </div>
    )
}

```

## setState同步异步问题

- setState在react上下文中是异步执行，并且会合并计算。
- 但setState任何情况下本质是同步，只是React为了优化做成了异步的样子，（多次setState修改，只会一次DOM渲染）
- 
### react的异步更新
```javascript
myClick =()=>{
    console.log('state',this.state.name)
    this.setState({
        state:'test'
    })
    //此时获取到的state仍然是kira
    console.log('---this.state.name',this.state.name)
}

render() {
    return(
        <div onClick={this.myClick}>
            button
        </div>
    )
}

```

### 在setTimeOut中更新state

```javascript
//在setTimeOut中更新state获取的值是同步的
 myClick =()=>{
    setTimeout(()=>{
        this.setState({
            name:'test'
        })
        console.log('---this.state.name',this.state.name)
    },0)
}
```

### 在事件的回调函数中setState

```javascript
componentDidMount() {
    document.body.addEventListener('click',()=>{
        this.setState({
            name:'test'
        })
        console.log('---this.state.name',this.state.name)
    })
}

```

## react的event事件
- fn(参数1,参数2，event)，event会在函数末尾追加一个event参数供咱们调用。
- react中的event和原生的event的不同，是自己封装的。
```javascript
myClick =(event)=>{
    //阻止默认行为（比如打开链接），但是会冒泡。
    event.preventDefault();
    //阻止冒泡
    event.stopPropagation();
    console.log('event', event.target)
    console.log('currentTarget', event.currentTarget)
}

render() {
    return(
        <a href={this.state.url} onClick={this.myClick}>
            button
        </a>
    )
}
```

## react的父子组件
- 关于state的状态数据提升，一般state数据都是存在父组件中，通过props传递给子组件，子组件完成动作（子组件一般只完成渲染和提交状态 ），在通知父组件更新数据。
-通过props传值 传方法 约定props的类型

```javascript
//父组件
 <Child list={this.state.list} onSubmit={this.onSubmit}/>
//子组件
export default class Child extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { list,onSubmit } = this.props;
        return(
            <div>
                {
                    list.map(item=>{
                        return(
                            <li key={item.id} onClick={onSubmit}>{item.name}</li>
                        )
                    })
                }
            </div>
        )
    }
}
```

## 函数组件

输入props，渲染组件。

```javascript
//函数组件
function Child(props){
    const { list,onSubmit } = this.props;
    return(
        <div>
            {
                list.map(item=>{
                    return(
                        <li key={item.id}>{item.name}</li>
                    )
                })
            }
        </div>
    )
}


//class组件
export default class Child extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { list,onSubmit } = this.props;
        return(
            <div>
                {
                    list.map(item=>{
                        return(
                            <li key={item.id}>{item.name}</li>
                        )
                    })
                }
            </div>
        )
    }
}

```

## 类组件 vs 函数组件

- 函数组件没有实例 没有生命周期 没有state和setState 只能接收props（接收props 返回jsx）
- class组件 大型组件难拆分，难测试。相同的业务分散个个方法中。
- 函数组件倡导 view = fn(props);更灵活 易拆分 更易测试。但没有生命周期 没有实例需要通过hooks增强其功能。
- 函数组件是一个纯函数 执行完即销毁 无法存储state。

```js
//类组件
class List extend React.Component {
    constructor(props){
        super(props);
    }
    render (){
        const {List } = this.props;
        return <ul>{list.map((c)=>{return <li>c</li>})}</ul>
    }
}
//函数组件
function List(props){
    const {list} = props;
    return <ul>{list.map((c)=>{return <li>c</li>})}</ul>
}

//纯函数使用hooks
import React,{useState} from "react"
export function ClickController(){
    const [count,setCount] = useState(0);
    return <div>
        <div>点击次数{count}</div>
        <button onClick={()=>{setCount(count + 1 )}}>点击</button>
    </div>
}

```

## useEffect

- useEffect 通过[]、[a,b]模拟mount 和 update
- 
- useEffect 无依赖或者依赖[a,b],组件更新时执行fn
- 下次执行useEffect之前，就会执行fn，无论更新或者卸载

```js
export function ClickController(){
    const [count,setCount] = useState(0);
    useEffect(()=>{
        console.log('参数[] 模拟componentDidMount')
        console.log()   
    },[])
    useEffect(()=>{
        console.log('参数[count] 模拟update,count更新之后调用');

    },[count])

    //exprot function clickController(){
        
    }
     
    useEffect(()=>{
        const timer  =  window.setInterval(()=>{
            console.log(Date.now())
        },1000)
        //通过返回一个fn 模拟componentWillUnMount
        return ()=>{
            window.clearInterval(timer)
        }
       
    },[])

    return <div>
        <div>点击次数{count}</div>
        <button onClick={()=>{setCount(count + 1 )}}>点击</button>
    </div>
}

```

## shouldComponentUpdate

shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

在react中只要父组件发生变化，无论子组件是否更新，都会默认被自动更新。为了避免性能浪费，shouldComponentUpdate主要通过浅比较state判断变化返回true/false控制子组件是否更新。
```js
import React, {Component} from 'react'
class APP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      name: 'XX'
    }
  }
  // 是否进行更新的生命周期，它有两个参数，它允许我们自定义是否更新，默认返回true
  // nextProps：更新后的props属性
  // nextState: 更新后的state状态
  shouldComponentUpdate(nextProps, nextState) {
    // 现在设置只有count改变时，才触发重新渲染
    if(nextState.count === this.state.count) {
      return false;
    }
    return true;
  }
  render() {
    const { count, name } = this.state
    // 第二个为要放至的dom元素位置
    return <div>
      <p>count: {count}</p>
      <p>name: {name}</p>
      <button onClick={this.changeCount}>累加count</button>
      <button onClick = {this.changeName}>不改变count，改变其它state状态</button>
    </div>
  }
  changeCount = () => {
    this.setState({count: this.state.count + 1})
  }
  changeName = () => {
    this.setState({name: '小小'})
    console.log(this.state.name)
  }

}
export default App
```
PureComponent 是个性能优化的组件，会自动对 shouldComponentUpdate中的state进行浅比较，判断是否更新

```js
import from 'react'
class App extends React.PureComponent{ {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      name: 'XX'
    }
  }
}
export default App
```


