//二叉搜索树BST，只允许在左节点存储比父节点小的值，右侧存储大于等于父节点的值


function BinarySearchTree(){
    
    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };
    
    var root = null;
    //树中插入一个新节点
    var insertNode = function(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right,newNode);
            }
        }
    };
    this.insert = function(key){
        var node = new Node(key);
        if(root === null){
            root = node;
        }else{
            insertNode(root,node);
        }
    };

   
//中序遍历，上行顺序访问BST，也就是从最小到最大的访问顺序
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root,callback);
    };

    var inOrderTraverseNode = function(node,callback){
        if(node !== null){
            inOrderTraverseNode(node.left,callback);
            callback(node.key);
            inOrderTraverseNode(node.right,callback);
        }
    };
    
//先序遍历是以优先于后代节点的顺序访问每个节点，先序遍历的一种应用是打印一个结构优化的文档;
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root,callback);
    };

    var preOrderTraverseNode = function(node,callback){
        if(node !== null){
            callback(node.key);
            preOrderTraverseNode(node.left,callback);
            preOrderTraverseNode(node.right,callback);
        }
    };
//后序遍历是先访问节点的后代节点，再访问节点本身；
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root,callback);
    };

    var postOrderTraverseNode = function(node,callback){
        if(node !== null){
            postOrderTraverseNode(node.left,callback);
            postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    };

//搜索树中的值，最大，最小，特定的值;

    //最小值，二叉搜索树，最小值位于最左侧；
    this.min = function(){
        return minNode(root);
    };

    var minNode = function(node){
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    }
    //最大值，二叉搜索树最大值在最右侧；
    this.max = function(){
        return maxNode(root);
    };

    var maxNode = function(node){
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    //搜索特定的值,存在，返回true，否则，返回false;
    this.search = function(key){
        return searchNode(root,key);
    };
    
    var searchNode = function(node,key){
        if (node === null){
            return false;
        }
        if(key < node.key){
            return searchNode(node.left,key);
        }else if(key > node.key){
            return searchNode(node.right,key);
        }else{
            return true;
        }    
    };
    
    //移除某个键;
    this.remove = function(key){
        root = removeNode(root,key);
    };
    
    var FindMinRight = function(node){
        while(node && node.left !==null){
            node.left;
        }
        return node;
    };

    var removeNode = function(node,key){
        if(node === null){
            return null;
        }
        if(node.key > key){
            node.left = removeNode(node.left,key);
            return node;
        }else if(node.key < key){
            node.right = removeNode(node.right,key);
            return node;
        }else{
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }
            if(node.left === null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }else{
                var minright = FindMinRight(node.right);
                node.key = minright.key;
                node.right= removeNode(node.right,minright.key);
                return node;
            }
        }
    };
                

}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

function printNode(value){
    console.log(value);
}
tree.inOrderTraverse(printNode);

tree.postOrderTraverse(printNode);

tree.preOrderTraverse(printNode);

console.log(tree.search(2));
console.log(tree.max());
console.log(tree.min());

