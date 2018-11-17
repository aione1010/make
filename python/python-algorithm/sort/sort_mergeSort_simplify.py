#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 18 02:27:37 2018

@author: make
"""

def mergeSort(alist):
    if len(alist)<=1:
        return alist
    middle=len(alist)//2
    left=mergeSort(alist[:middle])
    right=mergeSort(alist[middle:])
    merged=[]
    while left and right:
        merged.append(left.pop(0) if left[0]<right[0] else right.pop(0))
    merged.extend(right if right else left)
    return merged
alist=[52,312,54,7,3,2,56,34,65,82,91,65]
b=mergeSort(alist)
print(b)
