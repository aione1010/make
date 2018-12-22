let Queue = (function(){
    const items = new WeakMap();
    class Queue{
        constructor(){
            items.set(this,[]);
        }
        isEmpty(){
            let q = items.get(this);
            return q.length == 0;
        }
        enqueue(element){
            let q = items.get(this);
            q.push(element);
        }
        dequeue(){
            let q = items.get(this);
            return q.shift();
        }
        front(){
            let q = items.get(this);
            return q[0];
        }
        print(){
            let q = items.get(this);
            console.log(q.toString());
        }
        size(){
            let q = items.get(this);
            return q.length;
        }
    }
    return Queue;
})();

let queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue('mk');
queue.enqueue('lxw');
queue.enqueue('mk1');
console.log(queue.front());
queue.print();
console.log(queue.size());
queue.dequeue();
queue.print();