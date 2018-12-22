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


#进制转换
def sysConvert(x,base):
    stack = Stack()
    baseStr = ''
    digits = '0123456789ABCDEF'
    while x > 0:
        rem = x % base
        stack.push(rem)
        x = x // base
    while not stack.isEmpty():
        baseStr += str(digits[stack.pop()])
    return baseStr
print(sysConvert(10027,2))
print(sysConvert(10027,8))
print(sysConvert(10027,16))