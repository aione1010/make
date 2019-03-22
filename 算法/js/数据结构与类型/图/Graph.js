function Dictionary() {
    var items = {};

    this.has = function (key) {
        return items.hasOwnProperty(key);  // return key in items;
    };

    this.set = function (key, value) {
        items[key] = value;                //添加或者更新值
    };

    this.delete = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };

    this.get = function (key) {             //找出字典键对应的值
        return this.has(key) ? items[key] : undefined;
    };

    this.values = function () {             //将字典所包含的所有数值以数组形式返回
        var values = [];
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };

    this.clear = function () {
        items = {};
    };

    this.size = function () {
        var count = 0;
        for (var key in items) {
            if (this.has(key)) {
                count++;
            }
        }
        return count;
    };

    this.keys = function () {
        var keys = [];
        for (var k in items) {
            if (this.has(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    this.keys1 = function () {   //ES5以及以上
        return Object.keys(items);
    };

    this.getItems = function () {
        return items;
    };
};

function Queue() {
    let items = [];
    this.enqueue = function (element) {
        items.push(element)
    };
    this.dequeue = function () {
        return items.shift();
    };
    this.front = function () {
        return items[0];
    };
    this.isEmpty = function () {
        return items.length == 0;
    };
    this.size = function () {
        return items.length;
    };
    this.print = function () {
        console.log(items.toString());
    };
};
function Stack() {
    let items = [];
    this.push = function (element) {                       //添加元素到栈顶
        return items.push(element);
    };
    this.pop = function () {                              // 从栈顶移除元素
        return items.pop();
    };
    this.peek = function () {                            //返回到栈顶
        return items[items.length - 1];
    };
    this.isEmpty = function () {                      //判断是否为空
        return items.length == 0;
    };
    this.clear = function () {                       //清空栈
        return items = [];
    };
    this.print = function () {                       //输出栈里的元素
        console.log(items.toString());
    };
    this.size = function () {                         //栈里元素个数
        return items.length;
    }
}
function Graph() {
    var vertices = [];
    var adjList = new Dictionary();
    this.addVertex = function (v) {         //加顶点
        vertices.push(v);
        adjList.set(v, []);
    };
    this.addEdge = function (v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };
    this.toString = function () {        //输出图
        var s = '';
        for (var i = 0; i < vertices.length; i++) {
            s += vertices[i] + '->';
            var neighbors = adjList.get(vertices[i]);
            for (var j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    };
    //图的遍历，包括广度优先搜索(BFS)和深度优先搜索(DFS);
    var initializeColor = function () {     //颜色初始化为白色;
        var color = {};
        for (var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white';
        }
        return color;
    };
    // 广度优先遍历（BFS）
    this.bfs = function (v, callback) {
        var color = initializeColor(),
            queue = new Queue();
        queue.enqueue(v);    //起点，如果没有的话，可能会导致下面的没法执行；

        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (var j = 0; j < neighbors.length; j++) {
                var w = neighbors[j];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    };
    this.BFS = function (v) {
        var color = initializeColor(),
            queue = new Queue(),
            d = {},
            pred = {};
        queue.enqueue(v);
        for (var i = 0; i < vertices.length; i++) {
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (var j = 0; j < neighbors.length; j++) {
                var w = neighbors[j];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    d[w] = d[u] + 1;
                    pred[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }
        return {
            distances: d,
            predecessors: pred
        };
    };
    //深度优先搜索(DFS)
    this.dfs = function (callback) {
        var color = initializeColor();

        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback);
            }
        }
    };
    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey';
        if (callback) {
            callback(u);
        }
        var neighbors = adjList.get(u);
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i];
            if (color[w] === 'white') {
                dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
    }
    //顶点u的发现时间d[u]；
    //顶点u完成探索时间f[u];
    //顶点u的前溯点p[u];
    var time = 0;
    this.DFS = function () {
        var color = initializeColor(),
            d = {},
            f = {},
            p = {};
        time = 0;

        for(var i = 0;i<vertices.length;i++){
            var a = vertices[i];
            d[a] = 0;
            f[a]=0;
            p[a]=null;
        }

        for(var j = 0;j<vertices.length;j++){
            if(color[vertices[j]]==='white'){
                DFSVisit(vertices[j],color,d,f,p);
            }
        }

        return{
            discovery : d,
            finished:f,
            predecessors:p
        };
    };

    var DFSVisit = function(u,color,d,f,p){
        console.log('discovered '+u);
        color[u] = 'grey';
        d[u]=++time;
        var neighbors = adjList.get(u);
        for(var i=0;i<vertices.length;i++){
            var w = neighbors[i];
            if(color[w] === 'white'){
                p[w]=u;
                DFSVisit(w,color,d,f,p);
            }
        }
        color[u]='black';
        f[u]=++time;
        console.log('explored '+u);
    }


}
var graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (var i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log('********* printing graph ***********');
console.log(graph.toString());



console.log('********* bfs ***********');
function printNode(value) {
    console.log('Visited vertex: ' + value);
};
graph.bfs(myVertices[0], printNode);



console.log('********* dfs ***********');
graph.dfs(printNode);




console.log('********* sorthest path - BFS ***********');
var shortestPathA = graph.BFS(myVertices[0]);//对顶点A执行BFS方法；
console.log(shortestPathA);
//从A到其他顶点的所有路径
var fromVertex = myVertices[0];
for (var i = 1; i < myVertices.length; i++) {
    var toVertex = myVertices[i];
    var pathA = new Stack();
    for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        pathA.push(v);
    }
    pathA.push(fromVertex);
    var s = pathA.pop();
    while (!pathA.isEmpty()) {
        s += '->' + pathA.pop();
    }
    console.log(s);
}
graph = new Graph();
myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');

var result = graph.DFS();
console.log(result.discovery);
console.log(result.finished);
console.log(result.predecessors);