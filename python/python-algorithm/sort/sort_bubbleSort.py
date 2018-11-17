#冒泡排序，第一次排序进行n-1次，如果顺序不对，则调换


def bubbleSort(alist):
    for passnum in range(len(alist)-1,0,-1):
        for i in range(passnum):
            if alist[i] > alist[i+1]:
                alist[i],alist[i+1] = alist[i+1],alist[i]
    return alist



                   
aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(bubbleSort(aList))
