# -*- coding: utf-8 -*-
#字符串的排列；
"""
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。
"""
"""
Created on Mon Dec 17 18:41:14 2018

@author: make
"""
import collections

def checkInclusion(s1,s2):
    l1, l2 = len(s1), len(s2)
    if l2 < l1:
        return False
    dic1,dic2=collections.defaultdict(int),collections.defaultdict(int)   #键值对的值为一个int数据类型
    for ch in s1:
        dic1[ch] += 1    #s1中各个字母出现次数组成的字典
    for i in range(l1):
        dic2[s2[i]] += 1   #s2中对应的最前面长度为l1的字符中  各个字母出现的次数组成的字典
    if dic1 == dic2:
        return True
    for i in range(l1,l2):   #s2在l1和l2之间的部分，从前往后依次取长为l1的s2子字符串
        dic2[s2[i]] += 1
        dch = s2[i-l1]       #i-l1位置处的字母
        dic2[dch] -= 1       #把位置i-l1处带来的影响去除
        if not dic2[dch]:    #判断dch对应的值是否为0，为0的话，因为bool值为False，所以not False 就是True,就可以执行该if语句；
            dic2.pop(dch)
        if dic1 == dic2:
            return True
    return False