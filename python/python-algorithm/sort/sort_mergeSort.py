# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
def mergeSort(alist):
    
    if len(alist) > 1:
        
        mid = len(alist)//2
        
        lefthalf = alist[:mid]
        righthalf=alist[mid:]
        
        mergeSort(lefthalf)
        mergeSort(righthalf)
        
        i=j=k=0
        while i < len(lefthalf) and j<len(righthalf):
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