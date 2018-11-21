#  Dijkstra

graph={}
graph["start"]={}
graph["start"]['a'] = 2
graph['start']['b'] = 5

graph['a'] = {}
graph['a']['b'] = 8
graph['a']['d']=7

graph['b']={}
graph['b']['c']=4
graph['b']['d']=2

graph['c']={}
graph['c']['d']=6
graph['c']['fin']=3

graph['d']={}
graph['d']['fin']=1

graph['fin']= {}

distance={}
distance['a']=2
distance['b']=5
distance['c']=float('inf')
distance['d'] = float('inf')
distance['fin'] = float('inf')

processed = []


def find_smallest_distance_node(distance):
    smallest_distance = float("inf")
    smallest_distance_node = None

    for node in distance:

        dist=distance[node]
        if dist < smallest_distance and node not in processed:
            smallest_distance = dist
            smallest_distance_node = node
    return smallest_distance_node

node = find_smallest_distance_node(distance)

while node is not None:
    dist = distance[node]
    neighbors = graph[node]

    for n in neighbors.keys():
        new_dist = dist + neighbors[n]

        if new_dist < distance[n] :
            distance[n] = new_dist
    processed.append(node)
    node = find_smallest_distance_node(distance)

print(distance['fin'])
