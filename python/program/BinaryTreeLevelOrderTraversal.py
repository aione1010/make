# -*- coding: utf-8 -*-
#给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
"""
Created on Sun Dec 16 23:05:08 2018

@author: make
"""

class BinaryTree():
    def __init__(self,rootObj):
        self.val = rootObj
        self.left = None
        self.right = None
    def levelOrder(self,root):
        res = []
        if not root:
            return res
        arr = [root]
        while arr:
            templist=[]
            length=len(arr)
            for i in range(length):
                temp = arr.pop(0)
                templist.append(temp.val)
                if temp.left:
                    arr.append(temp.left)
                if temp.right:                                 #不能用elif，因为如果if运行了，elif就不会再运行，这里这个也需要运行
                    arr.append(temp.right)
            res.append(templist)
        return res
            