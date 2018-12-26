function Linkedlist(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    }
    let head = null;
    let length = 0;

    this.append = function(element){
        let node = new Node(element),
        current,
        if(head === null){
            head = node;
        }else{
            current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        length ++ ;
    };
    
    this.insert = function(pos,element){
        let node = new Node(element),
        current=head,
        previous=null,
        index = 0;

        if(pos>=0 && pos <= length){
            if(pos === 0){
                node.next = current;
                head = node;
            }else{
                while(index ++ < pos){
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            length ++;
            return true;
        }
        else{
            return false;
        }
    };

    this.removeAt = function(pos){
        let current = head,
        previous = null,
        index = 0;
        if(pos > -1 && pos < length){
            if(pos === 0){
                head = head.next;
            }
            else{
                while (index ++ < pos){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length --;
        }
        else{
            return null;
        }
    };

    this.indexOf = function(element){
        let current = head,
            index = 0;
        while(current){
            if(current.element === element){
                return index;
            }else{
                current = current.next;
                index ++;
            }
        }
        return -1;
    }
}