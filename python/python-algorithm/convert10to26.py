#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#10进制数用26个大写字母表示，其中：1=A，2=B，26=Z，27=AA，28=AB
#用递归进行转换

def convert(n):
    convertString=[chr(i) for i in range(65,91)]
    if n < 27:
        return convertString[n-1]
    else:
        return convert(n//26)+convertString[n%26-1]
print(convert(2026)) 
