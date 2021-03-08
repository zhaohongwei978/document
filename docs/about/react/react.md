# react相关

## react 函数调用时this的指向

### 在constructor中给函数绑定this

```
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
```
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
```
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

### react的异步更新
```
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

```
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

```
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
```
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

```
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

```
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
