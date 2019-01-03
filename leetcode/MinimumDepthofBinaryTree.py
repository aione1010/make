# -*- coding: utf-8 -*-
#树的最小深度，最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
"""
Created on Sun Dec 16 21:47:38 2018

@author: make
"""

class BinaryTree():
    def __init__(self,x):
        self.val = x
        self.left = None
        self.right = None
    def minDepth(self,root):
        if root:
            if root.left and root.right:
                return 1 + min(self.minDepth(root.left),self.minDepth(root.right))
            elif root.right:
                return 1 + self.minDepth(root.right)
            elif root.left:
                return 1 + self.minDepth(root.left)
            else:
                return 1
        else:
            return 0
        