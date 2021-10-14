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