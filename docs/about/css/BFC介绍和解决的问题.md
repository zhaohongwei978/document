# BFC 介绍和解决的问题

## 什么是 BFC？

它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

## BFC 的渲染规则？

- 1 内部元素会在垂直方向上一个接一个放置。
- 2 块级元素垂直方向距离由 margin 决定。属于同一个 BFC 的两个相邻元素 margin 会发生重叠。
- 3 BFC 的区域不会与浮动元素重叠。
- 4 BFC 是一个隔离的区域，容易内子元素和容器外的元素互不影响。
- 5 浮动元素也参与计算 BFC 高度

## 如何产生 BFC?

只要元素满足以下任一条件即可触发 BFC 特性：

- 浮动元素 float 除 none 以外的值
- 绝对定位元素 position (absolute fixed)
- display 为 inline-block table-cell flex
- overfow 除 visible 以外的值（hidden auto scroll

## 问题 1 同一个 BFC 下外边距会发生折叠（margin 重叠问题）

```angular2
<style>
*{
    margin: 0;
    padding: 0;
}

div {
    width: 100px;
    height: 100px;
    background-color: #42b983;
    margin: 10px;
}
</style>

//因为有body根元素会产生一个块级格式化上下文（BFC）
<body>
    <div>test1</div>
    <div>test2</div>
</body>
```

## 问题 2 BFC 解决高度塌陷

当为子元素设置浮动的时候，子元素就会完全脱离文档流，此时将会导致子元素无法撑开父元素，导致父元素的高度塌陷

由于浮动，容器内元素脱离了文档流 所以容器只剩下 10px 边距对象，如果触发 BFC，BFC 可以包裹浮动元素。

```angular2
<div style="border: 5px solid red;overfow:hidden">
    <div style="width: 100px ;height: 100px;background-color: #42b983;float: left"></div>
</div>
```

## 问题 3 BFC 可以阻止元素被浮动元素覆盖

原因：因为 float 浮起的元素会脱离文档流，不占用文档流，自然就会遮挡其他盒子。

```angular2
div style="width: 100px ;height: 100px;background-color: #42b983;float: left">浮动元素</div>
<div style="width: 200px;height: 200px;background-color: orangered;overflow:hidden"></div>
```
