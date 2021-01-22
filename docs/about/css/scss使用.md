# SCSS 使用 

## 变量的使用 

- 形式1 $bg:#ddd;
- 形式2 $font:{ s:12px,m:14px,l:16px }

```angular2html
.bg{
    background-color:$bg
}

.bg{
    font-size: map-get('$font',m) //设置字体大小为14px
}
```

## 嵌套书写

```angular2html
//css 
div p { background-color:red }

//scss嵌套书写
div{
    p{
         background-color:red
    }
}
```

## &符号表示父节点

```angular2html
//scss
div{
    p{
         background-color:red
    }
    
    &.hover{
        background-color:green
    }
}


// 转换成css
div p { background-color:red }
div.hover{ background-color:green }
```

## @mixin混入

- 通过混入可以把一些样式单独提出来，当使用@minx时，通过@include 引入,并且可以传递参数

```angular2html

@minx theme($color) {
    background-color:$color;
    font-size:30px;
}


x1{
  @include theme(red);
  border:10px solid #ddd;
}

x2{
  @include theme(green);
  border:10px solid #ddd;
}

```


- 使用mixin，如果 x1元素和@mixin theme拥有相同的样式，会出现冗余。  

```angular2html

@mixin n {
    font-size:20px;
}

.x1{
    @include n;
    font-size:30px;
    background-color:red;
}


//转换为css的效果
.x1 {
  font-size: 20px;
  font-size: 30px; //所以此时会取font-size:30px
  background-color: red;
}
```


## @extends

- 定义基础类，被继承的子类，可以继承基础类，也可以覆盖父类

```angular2html
//scss 
//定义父类
.n {
    font-size:20px;
}

//子类
.x1{
    @extend n;
    font-size:30px;
}
.x2{
    @extend n;
}


//转换为css

.n, .x1,x2 {
  font-size: 20px;
}

.x1 {
  font-size:30px;
}

.x2{

}
```  


## @extend VS @mixin

当样式和选择器之间的关系在某些方面比较紧密的时候，使用@extend。除此之外，你可以使用@mixin在任何地方。

- @extend 不够灵活，不能传递参数
- @extend增加了选择器之间的联系。能为一些相关的元素设置样式，让他们共享样式看起来合情合理。
- @mixin主要的优势就是它能够接受参数。
- minx混入的样式，会混入到选择器中，可能产生重复的代码。



## DRY编码方式

DRY就是Donot repeat youself 消除重复编码方法。

