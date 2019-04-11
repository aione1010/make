'''一个数二进制中1的个数'''
def numOfOne(i):
    count=0
    while i>0:
        count += 1
        i = (i-1)& i

