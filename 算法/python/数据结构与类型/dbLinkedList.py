class Node():
    def __init__(self,data):
        self.data = data
        self.next = None
        self.prev = None

class dbLinkedList():
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
    def insert(self,pos,item):
        node = Node(item)
        current = self.head
        previous = None
        index = 0
        if pos > -1 and pos <= self.length:
            if pos == 0:
                if self.head==None:
                    self.head = node
                    self.tail = node
                else:
                    node.next = current
                    current.prev = node
                    self.head = node
            elif pos == self.length:
                current = self.tail
                current.next = node
                node.prev = current
                self.tail = node
            else:
                while index < pos:
                    previous = current
                    current = current.next
                    index += 1
                previous.next = node
                node.next = current
                current.prev = node
                node.prev = previous
            self.length += 1
        else:
            return False
    def removeAt(self,pos):
        current = self.head
        previous = None
        index = 0
        if pos > -1 and pos < self.length:
            if pos == 0:
                self.head = current.next
                if self.length == 1:
                    self.tail = None
                else:
                    self.head.prev = None
            elif pos == self.length - 1:
                current = self.tail
                self.tail = current.prev
                self.tail.next = None
            else:
                while index < pos:
                    previous = current
                    current = current.next
                previous.next = current.next
                current.next.prev = previous
            self.length -= 1
            return current.data
        else:
            return None


    def size(self):
        return self.length

db = dbLinkedList()
db.insert(0,1)
db.insert(0,'mk')
db.insert(0,'lxw')
db.removeAt(0)
print(db.size())
