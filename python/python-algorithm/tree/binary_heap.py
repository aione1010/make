class BinHeap():

    def __init__(self):
        self.heapList = [0]
        self.currentSize = 0


    # 定义二叉堆插入新key时，上浮的方法；

    def percUp(self,i):
        while i//2 >0:
            if self.heapList[i] < self.heapList[i //2]:
                tmp = self.heapList[i]
                self.heapList[ i ] = self.heapList[i//2]
                self.heapList[i//2] = tmp
            i = i//2

    # key插入二叉堆；O(nlogn)

    def insert(self,key):

        self.heapList.append(key)
        self.currentSize = self.currentSize + 1
        self.percUp(self.currentSize)



    #删除最小值后，代替的那个节点下沉路径：

    def minChild(self,i):

        if i * 2 + 1 > self.currentSize:  # 唯一子节点
            return i * 2
        else:                             # 选择较小的
            if self.heapList[i * 2] < self.heapList[i * 2 + 1]:
                return i * 2
            else:
                return i * 2 + 1

    # 交换下沉；

    def percDown(self,i):

        while (i * 2) <= self.currentSize:
            mc = self.minChild(i)
            if self.heapList [i] > self.heapList[mc]:
                tmp = self.heapList[i]
                self.heapList[i] = self.heapList[mc]
                self.heapList[mc] = tmp
            i = mc

    # 删除最小值；

    def delMin(self):

        retval = self.heapList[1]
        self.heapList[1] = self.heapList[self.currentSize]
        self.currentSize = self.currentSize - 1
        self.heapList.pop()
        self.percDown(1)
        return retval

    #无序列表生成“堆”；
    
    def buildHeap(self,alist):

        i = len(alist) // 2                 #从最后节点也就是叶节点的父节点开始
        self.currentSize = len(alist)
        self.heapList = [0] + alist[:]
        
        while (i > 0):
            
            self.percDown(i)
            i = i-1
       
    
        
