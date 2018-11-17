def insertionSort(alist):

    for i in range(1,len(alist)):

        currentValue = alist[i]
        position = i

        while position > 0 and alist[position-1] > currentValue:
            alist[position] = alist[position -1]
            position = position - 1

        alist[position] = currentValue

    return alist

aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(insertionSort(aList))
