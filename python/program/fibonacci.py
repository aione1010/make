# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
def fibonacci (n):
    a=0
    b=1
    c=1
    for i in range(n):
        print(c)
        c=a+b
        a,b=b,a+b
fibonacci (20)