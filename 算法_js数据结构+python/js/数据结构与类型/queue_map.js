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


//击鼓传花

function hotPotato(names,num){
    let queue = new Queue();
    
    for(let i = 0; i < names.length; i++){
        queue.enqueue(names[i]);
    }
    let eliminated = '';
    while(queue.size() > 1){
        for (let i = 0;i < num; i++){
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(eliminated + '被淘汰');
    }
    return queue.dequeue();
}

let names = ['Jhon','Jack','Camila','Ingrid','Carl']
let winner = hotPotato(names,5);
console.log('The winner is ' + winner)
