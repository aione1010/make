#定义顶点Vertex类
class Vertex():

    def __init__(self,key):
        self.id = key
        self.connectedTo = {}

    def addNeighbor(self,nbr,weight = 0):   #nbr为顶点对象的key，连接到的那个顶点
        self.connectedTo[nbr] = weight

    def __str__(self):
        return str(self.id) + "connectedTo: "\
               + str([x.id for x in self.connectedTo])

    def getConnections(self):
        return self.connectedTo.keys()

    def getId(self):
        return self.id

    def getWeight(self,nbr):
        return self.connectedTo[nbr]


#定义图graph类

class Graph():

    def __init__(self):
        self.vertList = {}
        self.numVertices = 0

    #新增顶点
    def addVertex(self,key):
        self.numVertices = self.numVertices + 1
        newVertex = Vertex(key)
        self.vertList[key] = newVertex
        
        return newVertex
    
    #通过key获得顶点
    def getVertex(self,n):
        if n in self.verList:
            return self.verList[n]
        else:
            return None

    def __contain__(self,n):
        return n in self.vertList

    #添加边edge，若顶点不存在，则先添加顶点
    def addEdge(self,f,t,cost = 0):
        if f not in self.verList:
            nv = self.addVertex(f)
        if t not in self.vertList:
            nv = self.addVertex(t)
        self.vertList[f].addNeighbor(self.vertList[t],cost)

    #取得顶点集合
    def getVertices(self):
        return self.vertList.keys()

    #获得可迭代对象
    def __iter__(self):
        return iter(self.vertList.values())


#词梯问题
def buildGraph(worldFile):
    d={}
    g=Graph()
    wfile = open(worldFile,"r")   #此处读入一个单词数据文件
    for line in wfile:
        world = line[:-1]
        for i in range(len(word)):
            bucket = world[:i]+"_"+word[i+1:]
            if bucket in d:
                d[bucket].append(word)
            else:
                d[bucket] = [word]
    for bucket in d.keys():
        for word1 in d[bucket]:
            for world2 in d[bucket]:
                if world1 != world2:
                    g.addEdge(world1,world2)
    
    return g
# buildGraph("fourletterwords.txt")





































