def largest(arr):
    if len(arr)==1 & len(arr)!=0:
        return arr[0]
    else:
        pivot=arr[0]
        greater=[i for i in arr[1:] if i>pivot]
        if len(greater)==0:
            return pivot
        else:
            return largest(greater)

print("The largest number is:",largest([1,2,3,4,5,6,7,8,1,1,1,1,99,9,9000,99901,6666]))
