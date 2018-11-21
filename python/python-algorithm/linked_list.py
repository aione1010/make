#链表的实现


class Node():
    def __init__(self,data):
        self.data = data
        self.next = None

class Linklist():
    def __init__(self):
        self.head = None

    def isEmpty(self):
        return self.head == None

    def length(self):
        current = self.head
        count = 0
        while current != None:
            count += 1
            current = current.next
        return count

    def search(self,item):
        current = self.head
        found = False
        while current != None and not found:
            if current.data == item:
                found = True
            else:
                current = current.next
        return found

    def add(self,item):
        tmp = Node(item)
        tmp.next = self.head
        self.head = tmp


    def append(self,item):
        tmp = Node(item)
        if self.isEmpty():
            self.head = tmp
        else:
            current = self.head
            while current.next != None:
                current = current.next
            current.next = tmp

    def insert(self,item,pos):
        if pos == 0:
            self.add(item)
        elif pos >= self.length():
            self.append(item)
        else:
            tmp = Node(item)
            current = self.head
            count = 0
            pre = None
            while count < pos:
                pre = current
                current = current.next
                count += 1
            pre.next = tmp
            tmp.next = current
        

    def remove(self,item):

        found = False
        previous = None
        current = self.head

        while not found:
            if current.data == item :
                found = True
            else:
                previous = current
                current = current.next

        if previous == None:
            self.head = current.next
        else:
            current = current.next
            previous.next = current

mylist = Linklist()
mylist.add(2)
mylist.appendd(1)
print(mylist.search(1))
            
        
                
                    
                
            
            
        
