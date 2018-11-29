# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
"""
归并排序是将数列持续分成连部分，然后对两部分分别进行归并排序；
"""
def mergeSort(alist):
    
    if len(alist) > 1:                       #基本结束条件
        
        mid = len(alist)//2
        
        lefthalf = alist[:mid]        
        righthalf=alist[mid:]
        
        mergeSort(lefthalf)             #左右零部分分别调用自身；
        mergeSort(righthalf)
        
        i=j=k=0
        while i < len(lefthalf) and j<len(righthalf):     #交错把左右两部分进行归并到结果列表中；
            if lefthalf[i] < righthalf[j]:
                alist[k] = lefthalf[i]
                i += 1
            else:
                alist[k] = righthalf[j]
                j += 1
            k += 1
        while i <len(lefthalf):
            alist[k] = lefthalf[i]
            i += 1
            k += 1
        while j <len(righthalf):
            alist[k] = righthalf[j]
            j += 1
            k += 1 
    return alist

alist=[1,2456,1,5,6,3,63,8,6,549,6,9,7469,96663,49,6,589,6,4,123]
print(mergeSort(alist))
alist=[0]
print(mergeSort(alist))
alist=[]
print(mergeSort(alist))
