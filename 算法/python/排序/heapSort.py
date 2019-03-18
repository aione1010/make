def heapify(arr,i,heapSize):
    left = 2 * i + 1
    right = 2 * i + 2
    largest = i

    if left < heapSize and arr[largest] < arr[left]:
        largest = left
    if right < heapSize and arr[largest] < arr[right]:
        largest = right
    if largest != i:
        arr[i],arr[largest] = arr[largest],arr[i]
        heapify(arr,largest,heapSize)

def buildHeap(arr):
    heapSize = len(arr)
    for i in range(len(arr)//2,-1,-1):
        heapify(arr,i,heapSize)

def heapSort(arr):
    heapSize = len(arr)
    buildHeap(arr)

    while heapSize > 1:
        heapSize -= 1
        arr[0],arr[heapSize] = arr[heapSize],arr[0]
        heapify(arr,0,heapSize)
    return arr


print(heapSort([1,5,6,8,2,9,10,15,1,19]))