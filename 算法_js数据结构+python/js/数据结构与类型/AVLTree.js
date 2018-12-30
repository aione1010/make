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
}