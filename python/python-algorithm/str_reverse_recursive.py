#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 17 15:30:46 2018

@author: make
"""
def func(str):
    if len(str)<=1:
        return str[-1]
    else:
        return str[-1]+func(str[:-1])
print(func("abcdefghijk"))