//创建一个栈

function Stack(){
    let items = [];
    this.push = function(element){                       //添加元素到栈顶
        return items.push(element);
    };
    this.pop = function(){                              // 从栈顶移除元素
        return items.pop();
    };
    this.peek = function(){                            //返回到栈顶
        return items[items.length-1];
    };
    this.isEmpty = function(){                      //判断是否为空
        return items.length == 0;
    };
    this.clear = function(){                       //清空栈
        return items = [];
    };
    this.print = function(){                       //输出栈里的元素
        console.log(items.toString());
    };
    this.size = function(){                         //栈里元素个数
        return items.length;
    }
}
let stack=new Stack()
console.log(stack.isEmpty());
stack.push(5);
stack.push(2);
stack.push(8);
console.log(stack.peek());
stack.print();
console.log(stack.size())
