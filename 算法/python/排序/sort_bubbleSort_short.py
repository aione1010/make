#优化冒泡排序，提前结束运行

def shortBubbleSort(alist):
    passnum = len(alist) - 1
    exchange = True

    while passnum > 0 and exchange:
        exchange = False

        for i in range(passnum):
            if alist[i] > alist[i+1]:
                exchange = True
                alist[i],alist[i+1] = alist[i+1],alist[i]
        passnum = passnum-1

    return alist

aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(shortBubbleSort(aList))
    
