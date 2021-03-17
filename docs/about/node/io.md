# 异步IO

js是单线程执行的，当执行到一些文件读取 网络IO操作（如果在主线程上执行非常缓慢），js使用的是异步IO的方式即 事件循环机制。

## readFile读文件方式

```javascript
//readFileSync同步读文件
const fs = require('fs');
console.log(fs.readFileSync('./myFile.js').toString())



//readFile异步读取文件
fs.readFile('./myFile.js',function(error,data){
    if(error) throw error;
    console.log(data);
})


//该方法主要通过promiseify函数包裹，让普通的异步方法返回一个promise对象
const fs = require('fs');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
//async函数包裹
process.nextTick(async ()=>{
    const data = await readFile('./myFile.js')
    console.log(data.toString());
})

```