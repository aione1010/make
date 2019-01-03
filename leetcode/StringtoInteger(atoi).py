# -*- coding: utf-8 -*-
#字符串转换成整数。
"""
Created on Mon Dec 17 11:42:35 2018

@author: make
"""
def myAtoi(str1):
    import re
    a = str1.strip()
    matchObj = re.match(r'[\-,\+]?\d+',a)
    if matchObj == None:
        return 0
    b = matchObj.group(0)
    b=int(b)
    if b>(2**31)-1:
        return (2**31)-1
    if b<-(2**31):
        return -2**31
    return b