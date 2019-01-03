# -*- coding: utf-8 -*-
"""
Created on Mon Dec 17 17:28:00 2018

@author: make
"""

def lengthOfLongestSubstring(s):
    str1=''
    maxNum=0
    for i in s:
        index_i = str1.find(i)   #如果存在就返回位置，不存在则返回-1；index的话不存在就返回错误；
        if index_i != -1:
            str1 = str1[index_i + 1:]
        str1 += i
        if len(str1) > maxNum:
            maxNum = len(str1)  
    return maxNum
            