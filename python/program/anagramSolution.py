def anagramSolution(s1,s2):

    aList1=list(s1)
    aList2=list(s2)

    aList1.sort()
    aList2.sort()
    
    pos=0
    matches=True

    while pos < len(aList1) and matches :
        
        if aList1[pos] == aList2[pos]:
            pos = pos + 1
        else :
            matches = False

    return matches

print(anagramSolution("abced","abcde"))
