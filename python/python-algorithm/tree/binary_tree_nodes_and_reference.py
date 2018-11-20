#节点引用法构建树

class BinaryTree():
    def __init__(self,rootObj):
        self.key = rootObj
        self.leftChild = None
        self.rightChild = None

    def insertLeft(self,newNode):
        if self.leftChild == None:
            self.leftChild = BinaryTree(newNode)
        else:
            t = BinaryTree(newNode)
            t.leftChild = self.leftChild
            self.leftChild = t

    def insertRight(self,newNode):
        if self.rightChild == None:
            self.rightChild = BinaryTree(newNode)
        else:
            t = BinaryTree(newNode)
            t.rightChild = self.rightChild
            self.rightChild = t

    def getRightChild(self):
        return self.rightChild

    def getLeftChild(self):
        return self.leftChild

    def setRootVal(self,obj):
        self.key = obj

    def getRootVal(self):
        return self.key


#从全括号表达式建立表达式解析树

def bulidParseTree(fpexp):
    fplist = fpexp.split()
    pStack = Stack()
    eTree = BinaryTree("")
    pStack.push(eTree)
    currentTree = eTree
    
    for i in fplist:
        if i == "(" :
            currentTree.insertLeft("")
            pStack.push(currentTree)
            currentTree = currentTree.getLeftChild()
        elif i not in ["+","-","*","/",")"]:
            currentTree.setRootVal(int(i))
            parent = pStack.pop()
            currentTree = parent
        elif i in ["+","-","*","/"]:
            currentTree.setRootVal(i)
            currentTree.insertRight()
            pStack.push(currentTree)
            currentTree = currentTree.getRightChild()
        elif i == ")":
            currentTree = pStack.pop()
        else:
            raise ValueError
    return  eTree     


#  表达式解析树的求值
import operator
def evaluate(buildParseTree):
    opers = {"+":operator.add,"-":operator.sub,"*":operator.mul,"/":operator.truediv}
    leftC = buildParseTree.getLeftChild()
    rightC = buildParseTree.getRightChild()
    if leftC and rightC:
        fn = opers[buildParseTree.getRootVal()]
        return fn(leftC(),rightC())
    else:
        return buildParseTree.getRootVal()