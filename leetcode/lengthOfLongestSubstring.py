def lengthOfLongestSubstring(s):
        if s=="":
            return 0
        elif s==" ":
            return 1
        else:
            n=len(s)
            maxLen=[1]*n
            for i in range(0,n):
                if i >= int(maxLen[i-1]):
                    if s[i] not in s[i-maxLen[i-1]:i]:
                        maxLen[i]  =maxLen[i-1]+1     
                    else:
                        for j in range(i-maxLen[i-1],i):
                            if s[j] == s[i]:
                                maxLen[i]=i-j
            return max(maxLen)
s=" "
print(lengthOfLongestSubstring(s))


