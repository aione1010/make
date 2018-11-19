def partition(alist,first,last):

    pivot = alist[first]

    leftmark = first + 1
    rightmark = last
    done = False

    while not done:

        while leftmark <= rightmark and alist[leftmark] <= pivot:
            leftmark += 1

        while rightmark >= leftmark and alist[rightmark] >= pivot:
            rightmark -= 1


        if leftmark > rightmark :
            done =True
        else:
            alist[leftmark],alist[rightmark] = alist[rightmark],alist[leftmark]

    alist[first],alist[rightmark] = alist[rightmark],alist[first]

    return rightmark

def quicksortHelper(alist,first,last):
    if first < last:
        splitpoint = partition(alist,first,last)

        quicksortHelper(alist,first,splitpoint-1)
        quicksortHelper(alist,splitpoint+1,last)
    return alist
    
def quicksort(alist):
   return quicksortHelper(alist,0,len(alist)-1)

alist = [54,26,93,17,77,31,44,55,20]
print(quicksort(alist))
