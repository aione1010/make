let _items = Symbol();

class Stack{
    constructor(){
        this[_items] = [];
    }
    push(item){
        this[_items].push(item);
    }
    pop(){
        return this[_items].pop();
    }
    isEmpty(){
        return this[_items].length == 0;
    }
    size(){
        return this[_items].length
    }
    peek(){
        return this[_items][this[_items].length - 1];
    }
    clear(){
        this[_items]=[];
    }
    print(){
        console.log(this.toString());
    }
    toString(){
        return this[_items].toString();
    }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.print();
console.log(stack.toString());
let objectSymbols = Object.getOwnPropertySymbols(stack)
console.log(objectSymbols.length);
console.log(objectSymbols);
stack[objectSymbols[0]].push(1)                      //破坏Stack类
stack.print()