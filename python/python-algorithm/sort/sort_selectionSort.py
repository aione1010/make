def findSmallest(arra):
    smallest=arra[0]
    index=0

    for i in range(1,len(arra)):
        if arra[i]<smallest:
            smallest=arra[i]
            index=i
    return index

def selectionSort(arr):
    newArr=[]

    for j in range(0,len(arr)):
        smallest_index=findSmallest(arr)
        newArr.append(arr.pop(smallest_index))

    return newArr

print(selectionSort([0,9,8,2,4,1,5,7,2,8,9]))
