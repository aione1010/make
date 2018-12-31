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
        if(pos > -1 && pos <= length){
            let node = new Node(element),
                current = head,
                prev = null,
                index = 0;
            if(pos===0){
                if(!head){
                    head = node;
                    tail = node;
                }else{
                    node.next = current;
                    current.pre = node;
                    head = node;
                }
            }else if(pos===length){
                current = tail;
                current.next = node;
                node.pre = current;
                tail = node;
            }else{
                while(index ++ < pos){
                    prev = current;
                    current = current.next;
                }
                node.next = current;
                prev.next = node;

                current.pre = node;
                node.pre = prev;
            }
            length ++ ;
            return true;
        }else{
            return false;
        }
    };
    this.removeAt = function(pos){
        if (pos > -1 && pos < length){
            let current = head,
                index = 0,
                prev = null;
            if(pos === 0){
                head = current.next;
                if(length === 1){
                    tail = null;
                }else{
                    head.prev = null;
                }
            }else if (pos === length - 1){
                current = tail;
                tail = current.pre;
                tail.next = null;
            }else{
                while (index ++ < pos){
                    prev = current;
                    current = current.next; 
                }
                
                prev.next = current.next;
                current.next.pre = prev
            }
            length --;
            return current.element;
        }
        else{
            return null;
        }
    };

    
}