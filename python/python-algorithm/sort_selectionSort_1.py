def selectionSort(alist):
    for i in range(len(alist)-1,0,-1):
        maxpos=0                         #假定0处值最大
        for j in range(1,i+1):
            if alist[maxpos] < alist[j]:
                maxpos = j              #把比0处大的值的索引赋值给maxos

        alist[maxpos],alist[i] = alist[i],alist[maxpos] # 最大值放到最后

    return alist

aList=[54,56,85,91,20,3,26,59,22,30,20,20,20]
print(selectionSort(aList))
