function MinimumSpanningTree() {

    var INF = Number.MAX_SAFE_INTEGER;

    this.graph = graph;
    var minKey = function (key, visited) {
        var minIndex = -1,
            min = INF;
        for (var v = 0; v < key.length; v++) {
            if (visited[v] == false && key[v] <= min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    }
    this.prim = function () {                //Prim算法是一种求解加权无向连通图的MST问题的贪心算法。它能找出一个边的子集，使得其构成的树包含图中所有顶点，且边的权值之和最小
        var parent = [],
            key = [],
            visited = [],
            length = this.graph.length,
            i;

        for (i = 0; i < length; i++) {
            key[i] = INF;
            visited[i] = false;
        }

        key[0] = 0;
        parent[0] = -1;

        for (i = 0; i < length - 1; i++) {
            var u = minKey(key, visited);
            visited[u] = true;

            for (var v = 0; v < length; v++) {
                if (this.graph[u][v] && visited[v] == false && this.graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = this.graph[u][v];
                }
            }
        }
        return parent;
    };


    var initializeCost = function(length,graph){
        var cost = [];
        for (var i = 0; i < length; i++){
            cost[i] = [];
            for (var j = 0; j < length; j++){
                if (graph[i][j] == 0){
                    cost[i][j] = INF;
                } else {
                    cost[i][j] = graph[i][j];
                }
            }
        }
        return cost;
    };

    var find = function (i, parent) {    //防止MST出现环路
        while (parent[i]) {
            i = parent[i];
        }
        return i;
    };

    var union = function (i, j, parent) {
        if (i != j) {
            parent[j] = i;
            return true;
        }
        return false;
    };
    this.kruskal = function () {                 //求加权无向连通图MST的贪婪算法;
        
        var length = this.graph.length,
            parent = [], 
            cost,
            ne = 0,                            //最小生成树的边数目;
            a, b, u, v, i, j, min;

        cost = initializeCost(length,this.graph);

        while (ne < length - 1) {

            for (i = 0, min = INF; i < length; i++) {     //找出权值最小的边
                for (j = 0; j < length; j++) {
                    if (cost[i][j] < min) {
                        min = cost[i][j];
                        a = u = i;
                        b = v = j;
                    }
                }
            }

            u = find(u, parent);    //检查是否已经存在这条边，避免出现环路
            v = find(v, parent);

            if (union(u, v, parent)) {   //u,v是不同的边，则将其加入MST;
                ne++;
            }

            cost[a][b] = cost[b][a] = INF;  //移除这些边，避免重复
        }

        return parent;
    }
}
    var i;

    var graph = [[0, 2, 4, 0, 0, 0],
             [2, 0, 2, 4, 2, 0],
             [4, 2, 0, 0, 3, 0],
             [0, 4, 0, 0, 3, 2],
             [0, 2, 3, 3, 0, 2],
             [0, 0, 0, 2, 2, 0]];

var mst = new MinimumSpanningTree(graph);


console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");

var parent = mst.prim();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
}

console.log("********* Kruskal Algorithm - Minimum Spanning Tree ***********");

parent = mst.kruskal();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
}