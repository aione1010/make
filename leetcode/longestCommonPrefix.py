#编写一个函数来查找字符串数组中的最长公共前缀。

#如果不存在公共前缀，返回空字符串 ""。
#输入: ["flower","flow","flight"]
#输出: "fl"

def longestCommonPrefix(self, strs):
    
        """
        :type strs: List[str]
        :rtype: str
        """
    n = len(strs)
        
    s = ""
    if n>0:
        m=len(strs[0])
        for i in range(m):
            for j in range(1,n):
                if i < len(strs[j]) and strs[j][i] == strs[0][i]:
                    continue
                else:
                    return s
            
            s += strs[0][i]
        return s
    else:
        return s
