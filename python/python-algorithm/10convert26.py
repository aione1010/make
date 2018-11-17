#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 17 15:01:05 2018

@author: make
"""

def convert(n):
    convertString=[chr(i) for i in range(65,91)]
    if n < 27:
        return convertString[n-1]
    else:
        return convert(n//26)+convertString[n%26-1]
print(convert(2026)) 
