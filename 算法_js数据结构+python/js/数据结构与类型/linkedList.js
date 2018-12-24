function LinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;
    //添加元素到链表末尾
    this.append = function(element){
        let node = new Node(element),
            current;
        if(head==null){
            head = node;
        }else{
            current = head;
            while(current.next){
                current = current.next; 
            }
            current.next = node;
        }
        length ++;
    }
    this.removeAt = function(pos){
        if(pos > -1 && pos < length){
            let current = head,
                previous,
                index = 0;
            if (pos ===0){
                head = current.next;
            }else{
                while(index ++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length --;
            return current.element;
        }
        else{
            return null;
        }
    }
}