function removeRepetition(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (result.slice(-1) != str[i]) {
            result += str[i];
        }
    }
    return result;
}
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc

var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }
        }
    }
}
// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name,tree) {
    if(tree){
        if(tree.name == name){
            console.log(tree.id);
        }else{
            findIdByName(name,tree.left);
            findIdByName(name,tree.right);
        }
    }
}

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id,tree) {
    if(tree){
        if(tree.id == id){
            console.log(tree.name);
        }else{
            findNameById(id,tree.left);
            findNameById(id,tree.right);
        }
    }
}


// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(tree) {
    if (tree) {
        console.log(tree.name);
        getListWithDLR(tree.left);
        getListWithDLR(tree.right);
    }
}

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(tree) {
    if (tree) {
        getListWithLDR(tree.left);
        console.log(tree.name);
        getListWithLDR(tree.right);
    }
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(tree) {
    if (tree) {
        getListWithLRD(tree.left);
        getListWithLRD(tree.right);
        console.log(tree.name);
    }
}
findNameById(12,tree);
findIdByName('Fate',tree);
getListWithDLR(tree);
getListWithLDR(tree);
getListWithLRD(tree);
