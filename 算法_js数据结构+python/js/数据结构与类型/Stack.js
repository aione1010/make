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


//用栈进行二进制转换
function devideBy2(x){
    var remStack = new Stack(),
        rem,
        binaryString = '';
    while(x > 0){
        rem = Math.floor( x % 2 );
        remStack.push(rem);
        x = Math.floor( x / 2 );
    }
    while (!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(devideBy2(100))

//2,8,16进制
function devided(x,base){
    var remStack = new Stack(),
        rem,
        baseString = '',
        digits='0123456789ABCDEF';
    
    while(x > 0){
        rem = Math.floor( x % base);
        remStack.push(rem);
        x = Math.floor( x / base );
    }
    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}
console.log(devided(10027,2))
console.log(devided(10027,8))
console.log(devided(10027,16))



