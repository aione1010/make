def binarySearch(item,arr):
    low=0
    high=len(arr)-1

    while low <= high:
        mid=(low+high)//2
        
        if item == arr[mid]:
            return mid
        elif item > arr[mid]:
            low = mid + 1
        else:
            high=mid - 1
    return None

print(binarySearch(9,[1,3,4,5,6,7,8,9]))
