"""
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
"""





from collections import defaultdict


def threeSum(nums):
    dic = defaultdict(int)
    for ele in nums:
        dic[ele] += 1
    if 0 in dic and dic[0] > 2:
        res = [[0,0,0]]
    else:
        res = []
    positive = [p for p in dic if p > 0]
    negative = [n for n in dic if n < 0]
        
    for p in positive:
        for n in negative:
            r = -(p + n)
            if r in dic:
                if r == p and dic[p] > 1:
                    res.append([n,p,p])
                elif r == n and dic[n] > 1:
                    res.append([n,n,p])
                elif r < n or r > p or r == 0:
                    res.append([n,r,p])

    return res
print(threeSum([-1,0,1,2,-1,-4]))