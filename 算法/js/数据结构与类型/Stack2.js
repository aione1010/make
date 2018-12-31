let Stack=(function(){
    const items=new WeakMap();
    class Stack{
        constructor() {
            items.set(this, []);
        }
        push(item) {
            let s = items.get(this);
            s.push(item);
        }
        pop() {
            let s = items.get(this);
            let r = s.pop();
            return r;
        }
        isEmpty() {
            let s = items.get(this);
            return s == [];
        }
        size(){
            let s = items.get(this);
            return s.length;
        }
        peek(){
            let s = items.get(this);
            return s[s.length-1];
        }
        clear(){
            let s = items.get(this);
            s = [];
        }
        print(){
            let s = items.get(this);
            console.log(s.toString());
        }
    }
    return Stack;
})();

let s = new Stack();
s.push(1);
s.print();
s.clear();
s.size();