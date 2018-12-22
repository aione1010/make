class Stack():
    def __init__(self):
        self.items = []
    def isEmpty(self):
        return self.items == []
    def push(self,element):
        self.items.append(element)
    def pop(self):
        return self.items.pop()
    def peek(self):
        return self.items[len(self.items)-1]
    def size(self):
        return len(self.items)
    def __str__(self):
        return str(self.items)


stack = Stack()



def rev(myStr):
    str1=''
    for i in myStr:
        stack.push(i)
    n=stack.size()
    print(stack)
    for i in range(n):
        str1 += stack.pop()
    print(str1)
rev('hello')

print(stack)