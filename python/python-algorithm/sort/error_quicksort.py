#第一个结果为[0, 1, 1, 2, 2, 4, 5, 18]，
#第二个结果为[0, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 8, 18],
#错误原因  [1,1]在第一个里面less取得[]，因为range(1,1)范围为0


def sort(alist):
    if len(alist)<2:
        return alist
    else:
        a=alist[0]
        less=[alist[i] for i in range(1,len(alist)-1) if alist[i] <= alist[0]]
        print("a=",less)
        greater=[alist[i] for i in range(1,len(alist)-1) if alist[i]>alist[0]]

        return sort(less)+[a]+sort(greater)

print(sort([0,1,2,1,1,18,5,2,4,6,8,2,4,3]))


def quickSort(arr):

    if len(arr)<2:
        return arr
    else:
        pivot=arr[0]

        less=[i for i in arr[1:] if i <= pivot]
        print("a=",less)
        greater=[i for i in arr[1:] if i > pivot]
        return quickSort(less) + [pivot] + quickSort(greater)

print(quickSort([0,1,2,1,1,18,5,2,4,6,8,2,4,3]))
