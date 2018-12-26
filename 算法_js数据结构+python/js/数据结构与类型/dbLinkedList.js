function dbLinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
        this.pre = null;
    }
    let head = null,
        length = 0,
        tail = null;


    this.insert = function(pos,element){
        if(pos >= 0 && pos <= length){
            let node = new Node(element),
                current = head,
                previous = null,
                index = 0;
            if (pos === 0){
                if(!head){
                    head = node;
                    tail = node;
                }else{
                    node.next = current;
                    current.pre = node;
                    head = node;
                }
            }else if(pos === length){
                current = tail;
                current.next = node;
                node.pre = current;
                tail = node;
            }else{
                while(index ++ < pos){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.pre = node;
                node.pre = previous;
            }
            length ++;
            return true;
        }else{
            return false;
        }
    }
}