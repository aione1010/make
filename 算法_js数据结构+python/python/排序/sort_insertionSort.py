def insertionSort(alist):
    
    #长度为0或者为1
   if len(alist)<=1:
        return alist
    else:
        for i in range(2,len(alist)):
            currentValue = alist[i]
            pos = i
            while pos > 0 and alist[pos-1] > currentValue:   #在pos之前的值与currentValue比较，只要比currentValue大就后移，空出一位来
                alist[pos] = alist[pos-1]
                pos = pos-1
            alist[pos] = currentValue
        return alist

    
aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(insertSort(aList))
