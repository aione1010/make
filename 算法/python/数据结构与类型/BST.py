class Node():
    def __init__(self,key,left=None,right=None):
        self.key = key
        self.left = left
        self.right = right
    
class BinarySearchTree():
    def __init__(self):
        self.root = None
    #插入节点
    def insert(self,key):
        newNode = Node(key)
        if self.root == None:
            self.root = newNode
        else:
            self._insertNode(self.root,newNode)
    def _insertNode(self,node,newNode):
        if newNode.key < node.key:
            if node.left == None:
                node.left = newNode
            else:
                self._insertNode(node.left,newNode)
        else:
            if node.right == None:
                node.right = newNode
            else:
                self._insertNode(node.right,newNode)
    #取得节点
    def search(self,key):
        return self._searchNode(self.root,key)
    def _searchNode(self,node,key):
        if node == None:
            return False
        elif key < node.key:
            return self._searchNode(node.left,key)
        elif key > node.key:
            return self._searchNode(node.right,key)
        else:
            return True
    
    def min(self):
        return self._minNode(self.root)
    def _minNode(self,node):
        if node:
            while node and node.left:
                node = node.left
            return node.key
        return None
    
    def max(self):
        return self._maxNode(self.root)
    def _maxNode(self,node):
        if node:
            while node and node.right:
                node = node.right
            return node.key
        return None
    
    #树的遍历
    #中序遍历
    def inOrderTraverse(self):
        self._inOrderTraverseNode(self.root)
    def _inOrderTraverseNode(self,node):
        if node != None:
            self._inOrderTraverseNode(node.left)
            print(node.key)
            self._inOrderTraverseNode(node.right)
    
    #前序遍历
    def preOrderTraverse(self):
        self._preOrderTraverseNode(self.root)
    def _preOrderTraverseNode(self,node):
        if node != None:
            print(node.key)
            self._preOrderTraverseNode(node.left)
            self._preOrderTraverseNode(node.right)
    #后序遍历
    def postOrderTraverse(self):
        self._postOrderTraverseNode(self.root)
    def _postOrderTraverseNode(self,node):
        if node != None:
            print(node.key)
            self._postOrderTraverseNode(node.left)
            self._postOrderTraverseNode(node.right)
    #删除节点
    def delete(self,key):
        root = self._removeNode(self.root,key)
        return root
    def _findMinNode(self,node):
        if node:
            while node and node.left != None:
                node = node.left
            return node
        return None
    def _removeNode(self,node,key):
        if node == None:
            return None
        elif key < node.key:
            node.left = self._removeNode(node.left,key)
            return node
        elif key > node.key:
            node.right = self._removeNode(node.right,key)
            return node
        else:
            if node.left == None and node.right == None:
                node = None
                return node
            elif node.left == None:
                node = node.right
                return node
            elif node.right == None:
                node = node.left
                return node
            
            else:
                minRight = self._findMinNode(node.right)
                node.key = minRight.key
                node.right = self._removeNode(node.right,minRight.key)
                return node