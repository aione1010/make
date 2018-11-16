def anagramSolution(s1,s2):

    aList=list(s2)      #s2复制到列表中
    pos1=0
    stillOk=True       #大循环条件

    while pos1 < len(s1) and stillOk:
        pos2 = 0
        found = False

        while pos2 < len(aList) and not found:  #找出s2中是否有一样的字母
            if s1[pos1] == aList[pos2]:
                found =True
            else:
                pos2 = pos2 + 1

        if found:
            aList[pos2]=None   #把这个字母设为none，以表示找到
        else:
            stillOk=False     #未找到  设置为False，此时跳出最外圈的循环，
        pos1 = pos1 +1

    return stillOk

print(anagramSolution("abcd","dbca"))

