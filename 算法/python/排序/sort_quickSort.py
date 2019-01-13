def quickSort(arr):

    if len(arr)<2:
        return arr
    else:
        pivot=arr[0]

        less=[i for i in arr[1:] if i <= pivot]
        greater=[i for i in arr[1:] if i > pivot]
        return quickSort(less) + [pivot] + quickSort(greater)

print(quickSort([0,1,2,1,1,18,5,2,4,6,8,2,4,3]))
        
