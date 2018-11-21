#二叉搜索树的实现，需要用到TreeNode和BST两个类；

class TreeNode():
    def __init__(self,key,val,left=None,right=None,parent=None):
        self.key = key
        self.payload = val
        self.leftChild=left
        self.rightChild=right
        self.parent=parent

    def hasLeftChild(self):
        return self.leftChild

    def hasRightChild(self):
        return self.rightChild

    def isLeftChild(self):
        return self.parent and self.parent.leftChild==self

    def isRightChild(self):
        return self.parent and self.parent.rightChild==self

    def isRoot(self):
        return not self.parent

    def isLeaf(self):
        return not(self.leftChild or self.rightChild)

    def hasAnyChildren(self):
        return self.leftChild or self.rightChild

    def hasBothChildren(self):
        return self.rightChild and self.leftChild

    def replaceNodeData(self,key,val,lc,rc):
        self.key = key
        self.payload = val
        self.leftChild=lc
        self.rightChild = rc
        if self.hasLeftChild():
            self.leftChild.parent = self
        if self.hasRightChild():
            self.rightChild.parent = self

class BinarySearchTree:
    def __init__(self):
        self.root = None
        self.size = 0

    def length(self):
        return self.size

    def __len__(self):
        return self.size

    def __iter__(self):
        return self.root.__iter__()

    def put(self,key,val):
        if self.root:
            self._put(key,val,self.root)
        else:
            self.root = TreeNode(key,val)
        self.size = self.size + 1

        def _put(self,key,val,currentNode):
            if key < currentNode.key:
                
