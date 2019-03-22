function AVLTree(){

    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }

    var root = null;

    this.getRoot = function(){
        return root;
    };

    //子树高度;

    var heightNode = function(node){
        if(node === null){
            return -1;
        }else{
            return Math.max(heightNode(node.left),heightNode(node.right)) + 1;
        }
    };

    //旋转
    //向左的单旋转
    var rotationRR = function(node){
        var tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return node;
    };

    //向右单旋转
    var rotationLL = function(node){
        var tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    };

    //向右的双旋转
    var rotationLR = function(node){
        node.left = rotationRR(node.left);  //先对左子节点做一次左旋转
        return rotationLL(node);    //整个的来一次右旋转
    };

    //向左的双旋转
    var rotationRL = function(node){
        node.right = rotationLL(node.right);
        return rotationRR(node);
    };


    //插入
    var insertNode = function(node, element) {
        if(node === null){
            node = new Node(element);
        }else if(element < node.key){
            node.left = insertNode(node.left,element);

            if(node.left !== null){
                if((heightNode(node.left)-heightNode(node.right)) > 1){
                    if(element < node.left.key){
                        node = rotationLL(node);
                    }else{
                        node = rotationLR(node);
                    }
                }
            }
        }else if(node.key < element){
            node.right = insertNode(node.right,element);

            if(node.right !== null){
                if((heightNode(node.right) - heightNode(node.left)) > 1){
                    if(element > node.right.key){
                        node = rotationRR(node);
                    }else{
                        node = rotationRL(node);
                    }
                }
            }
        }
        return node;
    };
    //插入
    this.insert = function(element){
        root = insertNode(root,element);
    };

    //移除
    
}