class Node():
    def __init__(self,initdata):
        self.data = initdata
        self.next = None

class linkedList():
    def __init__(self):
        self.head = None

    def add(self,item):     #添加元素到首部
        tmp = Node(item)
        tmp.next = self.head
        self.head = tmp

    def remove(self,item):
        tmp = Node(item)
        found = False
        current = self.head
        previous = None
        while not found:
            if current.data == item:
                found = True
            else:
                previous = current
                current = current.next
        previous.next = current.next

    def append(self,item):    #添加到最后部分
        tmp = Node(item)
        current = self.head
        if current == None:
            current = tmp
        else:
            while current.next != None:
                current = current.next
            current.next = tmp
        
    def isEmpty(self):
        return self.head == None

    def length(self):
        current = self.head
        cou = 0
        while current.next != None:
            cou += 1
            current = current.next
        return cou
    
    def insert(self,item,pos):#添加到任意位置
        tmp = Node(item)
        current = self.head
        previous = None
        cou = 0
        if pos >= self.length():
            self.append(item)
        else:
            while cou < pos:
                previous = current
                current = current.next
                cou += 1
            previous.next = tmp
            tmp.next = current
        
    def pop(self):    #该处假定至少有一个元素
        current = self.head
        previous = None
        while current.next != None:
            previous = current
            current = current.next
        previous.next = None
        return current

    def poppos(self,pos):  #假设的元素在列表中
        current = self.head
        previous = None
        cou = 0
        while cou < pos:
            previous = current
            current = current.next
            cou += 1
        previous.next = current.next
        return current


    def index(self,item):        #假设在链表中
        current = self.head
        cou = 0
        found = False
        while not found:
            if current.data == item:
                found = True
            else:
                current = current.next
                cou += 1
        return cou


    def search(self,item):
        current = self.head
        found = False
        while not found and current.next != None:
            if current.data == item:
                found = True
            else:
                current = current.next
        return found