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

#击鼓传花
def hotPotato(namelist,num):
    queue = Queue()
    for i in namelist:
        queue.enqueue(i)
    while queue.size() > 1:
        for i in range(num):
            queue.enqueue(queue.dequeue())
        elimated = queue.dequeue()
        print(elimated + ' is elimated!')
    return queue.dequeue()

namelist=['Jhon','Jack','Camila','Ingrid','Carl']
winner = hotPotato(namelist,5)
print('The winner is '+winner)


