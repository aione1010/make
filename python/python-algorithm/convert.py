#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 17 15:01:05 2018

@author: make
"""
#10进制向二进制、八进制、十六进制转换

def convert(n,base):
    convertString="0123456789ABCDEF"
    if n < base:
        return convertString[n]
    else:
        return convert(n//base,base)+convertString[n%base]
print(convert(26,2))    
