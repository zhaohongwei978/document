# webpack配置

## webpack 打包后的内容简单版

- 1 新建a.js 和 b点js两个页面
- 2 在a.js中引入b.js的某个模块并输出，
- 3 查看webpack打包后的结果。

```javascript
a.js内容 

improt { goPlay  } from './b.js'
console.log(goPlay())

b.js内容

export function goPlay(){
    return 'hello'
}

webpack打包输出的结果 npm run build
//发现webpack打包结果是通过一个自执行函数包裹。

(() => { "use strict"; console.log("hello") })();

 "scripts": {
    "build": "webpack"//实际查找的即是./node_modules/.bin/webpack
  },
```

## entry指定打包入口

webpack是一个模块打包器，根据文件的依赖关系进行模块化打包。

```javascript
//单入口
module.exports = {
    entry:'./path/file1.js'
}

//多入口
module.exports = {
    entry:{
        file1:'./src/file1.js',
        file2:'./src/file2.js'
    }
}
```

## output指定打包入口

指定结果代码输出的位置

```javascript
//在weboack.config.js中配置 

'use strict'
const path = require('path')
console.log('path')
module.exports ={
    //entry配置多个入口
    entry:{
        file1:'./src/index.js',
        file2:'./src/index.js'
    },
    output: {
        path:path.join(__dirname,'dist'),
        //'[name].js'占位符作用，代表输出的文件名
        filename:'[name].js'
    },
    mode:'production'
}

//输出结果 在dist目录下会生成file1.js 和 file2.js两个文件 

```

## loader相关

### 常用loader

|  loader名   | 作用  |
|  ----  | ----  |
| babel-loader  | 转换es6 es7 |
| css-loader  | 支持css文件加载和解析 |
| scss-loader  | 把scss转换为css |
| ts-loader  | 把ts转换为js |
| file-loader  | 文件字体相关处理 |
| thread-loader  | 多线程打包 |
| raw-loader  | 将文件以字符串形式导入 |

### babel-loader的使用

通过该方式就可以对es6语法进行支持

1 npm install  @babel/core @babel/preset-env babel-lader -d

2 配置.babellrc文件

```javascript
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/proposal-class-properties"]
}
```

3 babel-loader配置

```javascript
module:{
    rules:[{
        test: /.js$/,
        use: 'babel-loader'
    }]
}
```

4 babel增加对 react的支持

```javascript
// 1 npm i react react-dom @babel/preset-react -d

// 2 .babellrc中增加对react的babel

{
    "presets": ["@babel/preset-env","@babel/preset-react"],
    "plugins": ["@babel/proposal-class-properties"]
}

// 3 在要build的文件中增加一段react结构

import React from 'react'
import ReactDOM from 'react-dom'

class Index extends React.Component{
     render(){
         return <div>121212</div>
     }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('app')
)

```

### css-loader相关处理

作用

- css-loader 用于加载.css文件，并转换为commonjs对象
- style-loader 将css插入到head中

- 1 npm i style-loader css-loader -d
- 2 loader解析scss

```javascript
module:{
        rules:[{
            test: /.js$/,
            use: 'babel-loader'
        },{
            test: /.css$/,
            use: ['style-loader','css-loader']
        },{
            test: /.scss$/,
            use: ['style-loader','css-loader','sass-loader']
        }]
    }
```

### file-loader相关

- 通过使用file-loader可以解析 png jpg gif svg等的解析。用file-loader打包的图片会给每张图片都生成一个随机的hash值作为图片的名字,并可以通过outputPath参数指定其所打包后存放的位置。

使用过程

- 通过npm i file-loader -d 安装file-loader
- file-loader配置
- file-loader的常用配置项：
name配置项是配置打包生成的文件的名字，使用的是placeholder语法， [name]   表示的是原文件的名字；[hash]  表示的是这次打包的hash值   [ext]表示的是原文件的后缀；

```javascript
{
    test:/\.(png|jp?g|gif)$/,
    use:{
        loader:'file-loader',
        options:{
            name:"[name]_[hash:6].[ext]",
            outputPath:"images/"
        }
    },
}

```

### url-loader相关

- 通过npm i file-loader url-loader -d
- url-loader是file-loader的加强版，在file-loader的基础上增加了一些功能。同时拥有file-loader的全部功能。
- url-loader优势主要是支持limit(在业务中如果有一些小图icon建议打包成svg，如果是大图不建议打包svg，因为会增大html代码体积)。

## plugins相关

plugins作用于整个构建过程。用于bundle文件的优化，资源管理以及环境变量的注入等。

### 常用plugins

|  plugins名   | 作用  |
|  ----  | ----  |
| commonChunkPlugin  | 将chunks相同的代码模块提取到公共 |
| clearWebpackPlugin  | 清理dist目录 |
| UglifyWebpackPlugin  | 压缩js |
| HtmlWebpackPlugin  | 创建HTML结构并引入bundle |
| ZipWebpackPlugin  | 将打包后的文件压缩为zip |
| thread-loader  | 多线程打包 |
| ExtractTextWebpackPlugin  | 将css从bundle里提取出成为一个独立的css文件 |

### 热更新相关问题

- 方法1 通过watch参数配置更新（使用该方式需要每次修改完配置之后都需要刷新页面）

```javascript
// 启动webpack 设置--watch 或者 在webpack.config.js中设置watch

scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --watch",//增加watch 参数
    "dev": "webpack-dev-server --open"
}
```

- 方法2  webpack-dev-server热更新
  - 不需要刷新浏览器。
  - 不需要输出文件，放在内存中。
  - 可以使用HotModuleReplacementPlugin(webpack自带)
  - 要将mode模式改为development

使用

- 1 安装 sudo npm install webpack-dev-server -g
- 2 配置package.json

```javascript
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --watch",
    "dev": "webpack-dev-server --open"
 },

```

- 3 webpack.config.js配置

```javascript
module.exports ={
    entry:{
        file1:'./src/index.js',
    },
    output: {
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    mode:'development',
    module:{
        rules:[{
            test:/.(png|jpg|gif|jpeg|svg)$/,
            use:'file-loader'
         }]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}
```

### sliptChunksPlugin进行公共脚本分离

## 文件指纹

- hash跟整个项目的构建相关，只要项目有修改，整个项目构建的hash就会发生改变。
- chunkhash 和webpack打包 的chunk有关，不同的entry对应的chunk不一样。
- contenthash 根据文件内容定义hash，内容不同hash值不同。

## HTML CSS JS压缩

- webpack内置uglifyjs-webpack-plugin

(由于浏览器在生产环境默认开启了uglifyjs-webpack-plugin，js会被自动压缩)

- optimize-css-assets-webpack-plugin + cssnano

用来压缩css

```javascript
//第一步导入相关资源
npm i  optimize-css-assets-webpack-plugin -d
npm i cssnano -d 
//引入资源+配置，即可以把css压缩
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') 

plugins:[
    new optimizeCssAssetsPlugin({
        assetNameRegExp:/\.css$/g,
        cssProcessor:require('cssnano')
    })
],
```

- 设置html-webpack-plugin设置压缩参数，压缩html文档

```
npm i html-webpack-plugin -d

```

## Mode内置函数

通过 process.en.NODE_ENV值为development/production

| 模式  | 描述 |
| ---  | ---  |
| developement  | 会开启NamedChunksPlugin 和 NameModulesPlugin  |
| production  | 会开启FlagDependencyUsagePlugin，FlagIncluedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin 和 TerserPlugin  |
| none  | 不开启任何优化  |

## source map

推荐

```
//eval 速度
//souce-map 产生.map文件
//cheap 比较快，但是不包含列信息（可以定位到行，但是不包含列）

 //开发环境
 devtool:"cheap-module-eval-source-map"
 //生产环境
 devtool:"cheap-module-souce-map"
```

source map设置等级，可以方便开发环境的调试。

## webpack打包速度

### 指定loader作用的范围

```javascript
{
    test: /.js$/,
    //在指定目录查找
    include:path.resolve("__dirname","./src"), 
    //不查找某个目录
    exclude: /node_modules/,
    use: {
        loader:'babel-loader',
        options: {
            presets: ["@babel/preset-env"]
        }
    }
}
```

### 指定项目中查找插件的规则

```
//默认规则是先在本地路径中查找，如果没有在项目node_modules中查找，如果项目node_modules中没有则在本地全局环境中查找。
resolve:{
    modules:[path.resolve(__dirname,"./node_modules")]
},
```

### externals引用cdn资源

如 import jquery from 'jquery'，我们引入了jquery资源，但是在打包的过程中我们不想把jquery打包到boundle.js中，而是通过cdn引入。可以通过externals配置。

```javascript
//在html中引入资源
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
//在webpack配置中
module.exports = {
    externals:{
        //jquery通过script方式引入
        'jquery':'jquery'
    }
}
```

## 简单webpack从0搭建

package.json

```json
   {
  "name": "webpackStudy",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config  config/webpack.dev.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-merge": "^4.2.2",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {}
}

  },
```

新建config

webpack是模块化打包工具，通过webpack可以把 .vue .sass .less .jsx .js等编译成 .js .css .png .jpg

```angular2html
##  全局安装webpack
npm i webpack  webpack-cli -g

## 版本检查
webpack -v
```

### webpack打包后的文件

- 首先打包后的结果，该函数是自执行函数

```angular2html
(function(){

})('key':function(){})

// key 代表文件路径 value：是一个函数（执行当前文件的代码），通过eval执行字符串代码
webpack把相互依赖的多个文件，  打包成为一个文件。


//多个文件打包成一个文件，通过__webpack_require__ 该函数通过递归自己调用自己，引入依赖的文件。  把所有文件打包形成一个文件。
function __webpack_require__(moduleId){
}

```

```javascript

 (function(modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {

   // Check if module is in cache
   if(installedModules[moduleId]) {
    return installedModules[moduleId].exports;
   }
   // Create a new module (and put it into the cache)
   var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
   };

   // Execute the module function
   modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

   // Flag the module as loaded
   module.l = true;

   // Return the exports of the module
   return module.exports;
  }
    (function(module, exports) {
    eval("console.log('hello')\n\n\n\n//# sourceURL=webpack:///./src/index.js?");
    })

 });

```

```angular2html
webpack优化点，使用懒加载 热更新 不用的不引入 大的包放在CDN上
速度优化
体积优化
自带的优化
- treeSharking 不用的代码不打包 （生产环境有效）
- scope-hoisting 作用域提升，用变量来计算一个结果，如果其他地方未使用到该变量，怎只会打印结果
自己实现的优化

比如moment插件，包含我们不需要语言包， 通过 ignorePlugin

一些资源包如 jquery不打包，通过cdn引入。如果打包进来体积爆炸。

```
