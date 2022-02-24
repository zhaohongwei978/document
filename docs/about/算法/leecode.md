#算法 

## 反转链表

```js
function listNode(val,next){
    this.val === undefined ? 0 : this.val;
    this.next === undefined ? null : next
}

单链表的头节点 head ，请你反转链表，并返回反转后的链表。
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

function reverseList = (head){
    let pre = null;
    let cur = head;
    while(cur){
        //保存当前节点的下一个节点
        let temp = cur.next;
        // 当前节点指向 指定的上一个节点
        cur.next = pre;
        //当前节点后移
        pre = cur;
        cur = temp;
    }
    return pre;
    

```

判断一个字符串是否括号匹配

```js
//主要利用栈的思路遇到左半部分符号入栈，遇到右半部分符号，取栈中最后的符号和当前右半部分符号匹配是否对称。
fn('(a{b]c1');
function isMatch(bottom,top){
    if(bottom === '{' && top === '}') return true;
    if(bottom === '[' && top === ']') return true;
    if(bottom === '(' && top === ')') return true;
    return false;
}
function fn(str){
     const typeLeft = ['{','[','('];
     const typeRight = ['}',']',')'];
     let stack = [];
     for(let i = 0;i<str.length;i++){
         const item = str[i];
         if(typeLeft.includes(item)){
              stack.push(item);
         }
         else if(typeRight.includes(item)){
             const bottom = stack.length -1;
             if(isMatch(stack[bottom],item)){
                  stack.pop()
             }else{
                 return false;
             }
         };
     }
     return stack.length === 0;
 }

```

用两个stack，实现一个队列

```js
//add的时间复杂度o(1) delete时间复杂度o(n)
//思路：主要是实现delete方法，需要使用两个数组，stack1循环往出pop，把pop出的值存入stack2，在stack2中取pop，stack2循环剩余元素放入stack1.
class  Queue{
    constructor(){
        this.stack1 = [];
        this.stack2 = [];
    }

    add(val){
        this.stack1.push(val);
    }

    delete(){
       
        const stack1 = this.stack1;
        const stack2 = this.stack2;
        while(stack1.length){
            const n = stack1.pop();
            if(n!==null){
                stack2.push(n);
            }

        }
        const res =   stack2.pop();
        while(stack2.length){
            const n = stack2.pop();
            if(n!==null){
                stack1.push(n);
            }
        }
        return res || null;
    }

    get length(){
        return this.stack1.length;
    }
}
```

用js实现一个链表

```js
function createLinkList(arr){
    const {length} = arr;
    if (length === 0) throw new Error('is empty');
    let curNode = {
        value: arr[length - 1]
    }
    if(length === 1) return curNode;
    for(let i =length-2;i>=0;i--){
        curNode = {
            value:arr[i],
            next:curNode,
            // prev:arr[arr.length - 1]
        }
    }
    return curNode;
}
createLinkList([10,20,30,40,50])
```