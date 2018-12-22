#先进先出

class Queue():

    def __init__(self):
        self.items = []
    
    def isEmpty(self):
        return self.items == []
    def enqueue(self,item):
        self.items.append(item)
    
    def dequeue(self):
        return self.items.pop(0)
    
    def size(self):
        return len(self.items)
    
    def front(self):
        return self.items[0]