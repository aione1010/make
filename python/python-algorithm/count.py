def num(arr):
    if len(arr)==0:
        return 0
    else:
        return 1+num(arr[1:len(arr)])
print(num([0,1,2,3,2,1]))
