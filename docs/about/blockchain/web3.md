
# solidity


|  表头   | 表头  |
|  ----  | ----  |
| view  | 读取区块链上的数据，但不修改区块链上面的数据 |
| pure  | 不修改也不读取区块链上的数据 |
| public  | 任何人都能调用到 |
| private  | 只能当前合约调用 |
| constant  | 返回数据但是不更新区块链上的数据 |
| payable  | 转账用到 |


```solidity
pragma solidity ^0.4.0;
contract HelloWorld {

    string name = 'zhangsan';
    //在合约上读取变量时，不需要消耗燃料
    function getName() public view returns (string){
       return name;
    }
}


contract HelloWorld {

    string name = 'zhangsan';
    function getName() public view returns (string){
       return name;
    }
    
    //该方法会修改变量name，消耗gas并会把全网所有的name都更新
    function setName(string _name) public{
        name = _name;
    }
    //通过返回pure只会修改把值修改并放在内存中，不会修改变量 也不会消耗gas
    function testPear(uint a, uint b) public pure returns(uint){
        return a -b;
    }
}

```


|  数据类型   | 含义  |
|  ----  | ----  |
| bool  | true/false |
| string  | "1212" |
| int（int = int256）  | 1212 （不能表示负数）|
| unit（unit = int256）  | "1212" （能表示负数）|
| private  | -10000 = ~ 99999 |
| byte  | 0x12 0xab |