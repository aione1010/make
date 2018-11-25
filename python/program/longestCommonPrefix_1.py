def longestCommonPrefix(self, strs):
    
        """
        :type strs: List[str]
        :rtype: str
        """
        if not strs:
            return ""
        small = min(strs, key = len)
        for i, c in enumerate(small):
            for str1 in strs:
                if str1[i] != c:
                    return small[:i]
        return small
