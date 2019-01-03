# -*- coding: utf-8 -*-
#给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
"""
Created on Tue Dec 18 13:05:24 2018

@author: make
"""
#方法一：
def f1(strs1,strs2):
    arr=[]
    for i in strs1:
        for j in strs2:
            arr.append(i+j)
    return arr

def letterCombinations(digits):
    dic={'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    if len(digits)==0:
        return []
    elif len(digits)==1:
        return list(dic[digits])
    else:
        return f1(dic[digits[0]],letterCombinations(digits[1:]))



digits='23'
print(letterCombinations(digits))



#方法二

def letterCombinations(digits):
    dic={'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    if len(digits)==0:
        return []
    acc=[e for e in dic[digits[0]]]
    for i in digits[1:]:
        acc=[w+k for w in acc for k in dic[i]]
    return acc
digits='23'
print(letterCombinations(digits))
