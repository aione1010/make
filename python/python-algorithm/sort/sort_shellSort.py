#shell sort 以插入排序为基础

def gapInsertionSort(alist,start,gap):
    for i in range(start + gap , len(alist) , gap):
        currentValue = alist[i]
        position = i

        while position >=gap and alist[position - gap] > currentValue:
            alist[position]=alist[position - gap]
            position = position - gap

        alist[position]=currentValue

    return alist

def shellSort(alist):

    sublistcount=len(alist)//2
    while sublistcount > 0:
        for startposition in range(sublistcount):
            gapInsertionSort(alist,startposition,sublistcount)
        print("After increments of size ", sublistcount,"The list is ",alist)
        sublistcount = sublistcount // 2

    return alist

aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(shellSort(aList))
    
    
