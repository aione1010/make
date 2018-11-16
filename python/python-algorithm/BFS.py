from collections import deque

def person_is_seller(name):
    return name[-1] == "M"
    
graph={}
graph['you']=['BOB','CLAIRE','ALICE']
graph['BOB']=['ANUJ','PEGGY']
graph['ALICE']=['PEGGY']
graph['CLAIRE']=['JONNY','THOM']
graph['ANUJ']=[]
graph['PEGGY']=[]
graph['THOM']=[]
graph['JONNY']=[]

def search(name):

    search_queue = deque()
    search_queue += graph[name]
    searched=[]

    while search_queue:
        person = search_queue.popleft()
        if not person in searched:
            if person_is_seller(person):
                print(person + " is a mango seller !")
                return True
            else:
                search_queue += graph[person]
                searched.append(person)
                
    return False

search('you')
