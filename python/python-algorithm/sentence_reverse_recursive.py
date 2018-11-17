#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 17 16:33:05 2018

@author: make
"""
# sentence reverse
def func(arr):
    
    if len(arr)<=1:
        return arr[-1]
    else:
        return arr[-1] +" " +func(arr[:-1])

sentence=" 'list' object has no attribute 'join' "
arr=sentence.split(" ")
print(func(arr))

