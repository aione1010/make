def partition(alist,first,last):

    pivot = alist[first]                                                      #选定中值
    leftmark = first + 1     #选定左标，
    rightmark = last         #选定右标
    done = False             #没有完成

    while not done:          #循环条件

        while leftmark <= rightmark and alist[leftmark] <= pivot:        #左标移动的条件
            leftmark += 1

        while rightmark >= leftmark and alist[rightmark] >= pivot:      #右标移动的条件
            rightmark -= 1   #依次递减


        if leftmark > rightmark :
            done =True                        #中止条件
        else:
            alist[leftmark],alist[rightmark] = alist[rightmark],alist[leftmark]   #互换，

    alist[first],alist[rightmark] = alist[rightmark],alist[first]

    return rightmark

def quicksortHelper(alist,first,last):
    if first < last:                                     #基本结束条件
        splitpoint = partition(alist,first,last)         #分裂为两部分

        quicksortHelper(alist,first,splitpoint-1)        #递归调用
        quicksortHelper(alist,splitpoint+1,last)
    return alist
    
def quicksort(alist):
   return quicksortHelper(alist,0,len(alist)-1)

alist = [54,26,93,17,77,31,44,55,20]
print(quicksort(alist))
