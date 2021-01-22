# render 函数

- vm.\_render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node

```
//如果存在render函数，vue就不再寻找template
var app = new Vue({
    el:'#app',
    //render 函数的第一个参数是 createElement
    render(createElement){
        return createElement('div',{
            attrs:{
                id:'#app1'
            }
        },this.msssage)
    },
    data(){
        return{
            message:'hello'
        }
    }
})
```
