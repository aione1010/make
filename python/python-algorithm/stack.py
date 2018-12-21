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

stack = Stack()
stack.push(1)
print(stack.size())