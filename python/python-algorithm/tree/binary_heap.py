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

    # key插入二叉堆；

    def insert(self,key):
        self.heapList.append(k)
        self.currentSize = self.currentSize + 1
        self.percUp(self.currentSize)
