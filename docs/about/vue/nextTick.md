# nextTick 实现

- 1 数据发生变化，触发 setter
- 2 dep.notice()触发 dep 下的 weather
- 3 weatcher.update(),update 有同步更新，和异步更新（queueWeather）。
- 4 将一个观察者对象 weather,push 进 queue 队列，在 queue 队列中已经存在相同的 id 则该观察者对象 weather 将被跳过.利用 hash 的 map 结构 对 weather 去重，防止相同的 weather 被重复添加到 queue 中。
- 6 nextTick 利用事件循环，在一下次 tick 时，flushSchedulerQueue 执行所有 queue 队列中的 weather，更新视图。

## nextTick 的表现？

打印的结果是 begin，为什么我们明明已经将 test 设置成了“end”,获取真实 DOM 节点的 innerText 却没有得到我们预期中的“end”，可见该操作是异步的。

```
<template>
  <div>
    <div ref="test">{{test}}</div>
    <button @click="handleClick">tet</button>
  </div>
</template>
export default {
    data () {
        return {
            test: 'begin'
        };
    },
    methods () {
        handleClick () {
            this.test = 'end';
            console.log(this.$refs.test.innerText);//打印“begin”
        }
    }
}

```

通过 nextTick，我们可以拿到 DOM 操作之后的结果。

```
<template>
	<div class="" id="app">
		<span ref="msg">{{msg}}</span>
	    <button @click="change">button</button>
  </div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return{
			msg:'1111'
		}
	},
	methods:{
		change(){

            this.msg = "222"
            console.log('1111',this.$refs.msg.innerHTML) //打印结果 111
			this.$nextTick(()=>{
				console.log('1111',this.$refs.msg.innerHTML) //打印结果 222
			})
		},
	}
}
</script>
```

## 数据变化时，weather 如何更新？

- 1 数据发生变化，触发 setter
- 2 dep.notice()触发 dep 下的 weather
- 3 weatcher.update(),update 有同步更新，和异步更新（queueWeather）。

```
update () {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        /*同步则执行run直接渲染视图*/
        this.run()
    } else {
        /*异步推送到观察者队列中，下一个tick时调用。*/
        queueWatcher(this)
    }
}
```

## queueWeather 对 weather 去重？

- 1 将一个观察者对象 weather,push 进 queue 队列，在 queue 队列中已经存在相同的 id 则该观察者对象 weather 将被跳过.
- 2 利用 hash 的 map 结构 对 weather 去重，防止相同的 weather 被重复添加到 queue 中。
- 3 nextTick 利用事件循环，在一下次 tick 时，执行所有 queue 队列中的 weather，更新视图。

```
let has = {};
let queue = [];
let waiting = false;

function queueWatcher(watcher) {
    //获取weather的id
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true; // {'1':true,'2':true}
        queue.push(watcher);

        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}

## 

function flushSchedulerQueue () {
    let watcher, id;

    for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }

    waiting  = false;
}
```

## 为什么会使用 nextTick?

vue 中我们修改 data 中的 key，并不可能每一次修改 data 中的 key 都要渲染一下页面。在 vue 中会把多次对 data 中 key 的修改合并，放在一个事件循环中，然后利用事件循环机制，当前这个事件循环对 key 的所有修改都结束会调用一个 nextTick 函数，标志此时渲染结束。

事件循环的事件执行完，先通过 Promise 实现 nextTick 如果 nextTick 不支持使用 MucationObserver 如果 MucationObserver 不支持使用 setTimeOut。

修改数据时，视图并不会即时的更新，而是等在同一事件循环的所有数据变化完成后，再进行视图更新。类似于 Event Loop 事件循环机制。

Vue 实现响应式并不是在数据改变后就立即更新 DOM，而是在一次事件循环的所有数据变化后再异步执行 DOM 更新.

nextTick

## 为什么我们频繁修改 data 属性，不会多次更新 view？

当我们同时修改多次 data 属性时候，该判断 if (has[id] == null) 防止重复添加更新任务，并且利用了 event loop 机制在合适的时机去更新视图。

在 update 方法中，实际调用 nextTick 更新视图。
在事件循环中，当前宏任务调用栈清空才会去执行微任务。
