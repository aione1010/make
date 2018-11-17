#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 17 15:01:05 2018

@author: make
"""
def convert(n,base):
    convertString="0123456789ABCDEF"
    if n < base:
        return convertString[n]
    else:
        return convert(n//base,base)+convertString[n%base]
print(convert(26,2))    
