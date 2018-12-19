def getLongestPalindrome(s):
    n = len(s)
    if n == 0:           #s为空
        maxLen = 0
        return maxLen,s
    else:                  #s不为空
        maxLen = 1
        s_p = s[0]  #假如无回文，设置第一个即是结果
        if s == s[::-1]: #s正倒一样
            s_p = s
            maxLen = n
            return maxLen,s_p
        
        else:
            #检查每增加一个字符，就判断以该字符结尾，长度为maxLen + 1 或者maxLen + 2
            #的子字符串是否为回文，如果是，更新
            for i in range(n):
                if i-maxLen >= 1 and s[i-maxLen - 1:i + 1] == s[i-maxLen - 1:i+1][::-1]:
                    s_p = s[i-maxLen - 1:i + 1]   #该处取索引，不取结果的话，速度会提升；
                    maxLen += 2     #回文关于中间对称，例如“abcba”
                    continue
                if i - maxLen >= 0 and s[i-maxLen:i + 1] == s[i-maxLen:i+1][::-1]:
                    s_p = s[i-maxLen : i + 1]   #回文长度为偶数，例如“abccba”
                    maxLen += 1
            return maxLen,s_p
    
print(getLongestPalindrome("abc1234321ab"))

"""
def f(s):
    n = len(s)
    if n < 2 or s==s[::-1]:
        return s
    else:
        maxLen=1
        start = 0
        for i in range(1,n):
            if i-maxLen >= 0 and s[i-maxLen:i+1] == s[i-maxLen:i+1][::-1]:
                start = i-maxLen    #只取索引，值在最后取
                maxLen +=1
            if i-maxLen-1 >= 0 and s[i-maxLen-1:i+1] == s[i-maxLen-1:i+1][::-1]:
                start = i-maxLen-1   #只取索引，值在最后取
                maxLen +=2
        return s[start:start+maxLen]   #此处取值
"""
