import re
def palcheck(arr):
        if len(arr) <= 1:
            return True
        else:
            if arr[0]==arr[-1]:
                return palcheck(arr[1:-1])
            else:
                return False

def palcheck_string(string):
    arr=re.findall("[a-zA-Z]",string.lower())
    return palcheck(arr)

print(palcheck_string("Reviled did I live, said I, as evil I did deliver"))
