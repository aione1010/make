def binarytree(r):
    return [r,[],[]]

def insertleft(r,branch):
    t=r.pop(1)
    if len(t)>1:
        r.insert(1,[branch,t,[]])
    else:
        r.insert(1,[branch,[],[]])
    return r

def insertright(r,branch):
    t=r.pop(2)
    if len(t)>1:
        r.insert(2,[branch,[],t])
    else:
        r.insert(2,[branch,[],[]])
    return r

def getrootval(root):
    return root[0]

def setrootval(root,newval):
    root[0] = newval

def getleftchild(root):
    return root[1]

def getrightchild(root):
    return root[2]

a=binarytree(" ")
print(a)
