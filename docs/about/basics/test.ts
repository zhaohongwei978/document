const arr:[number,string] = [1,'1']
console.log('--',arr)
const arr1: number[] = [1,2,3,4]
console.log('--',arr1)
const arr2: Array<string|number> = [1,2,3,4,'5']
console.log('--',arr2)


['ruleForm1'].include(ruleForm) && this.add1();

interface Company{
    name:string,
    address:string,
    num:number
}

let company:Company = {
    name: 'zhangsan',
    address: "beijing",
    num: 10,
}
interface Group extends Company{
    groupName:'',
    groupNum:13
}
let group:Group = {
    groupName: "",
    groupNum: 13,
    name: "",
    address: "",
    num: 0
}
//as断言表示这个对象就是这样的类型
let group1:Group = {
    groupName: "",
    groupNum: 13,
    name: "",
    address: "",
    num: 0,
    money:1000
} as Group