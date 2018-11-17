#递归算法实现二分法

def binarySearch(item,arr):
    if len(arr)==0:
        return False                #不存在，返回False
    else:
        mid=len(arr)//2
        if arr[mid]==item:
            return mid               #存在，返回索引
        elif arr[mid] > item:
            return binarySearch(item,arr[0:mid])
        else:
            return binarySearch(item,arr[mid+1:])
print(binarySearch(3,[0,2,3,4,5,6,7,9]))
