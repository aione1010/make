# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
def reverseNum(x):
    y=0
    if x>0:
        flag = 1
    else:
        flag = -1
    x=abs(x)
    while(x!=0):
        a=x%10
        x=int(x/10)
        y=y*10+a
    y=y*flag
    if x<=(2**32)-1 and x>=-2**32 and y<=(2**32)-1 and y>=-2**32:
        return y
    else:
        return 0