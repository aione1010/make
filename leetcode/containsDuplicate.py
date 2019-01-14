"""给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值最大为 t，并且 i 和 j 之间的差的绝对值最大为 ķ。

示例 1:

输入: nums = [1,2,3,1], k = 3, t = 0
输出: true
示例 2:

输入: nums = [1,0,1,1], k = 1, t = 2
输出: true
示例 3:

输入: nums = [1,5,9,1,5,9], k = 2, t = 3
输出: false

"""

def containsDuplicate(nums,t,k):
    n = len(nums)
    if t == 0 and len(set(nums)) == n:
        return False
    for i in range(n):
        for j in range(1,k+1):
            if i + j >= n:
                break
            else:
                if abs(nums[i+j] - nums [i]) <= t:
                    return True
    return False

