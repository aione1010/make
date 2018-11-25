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
