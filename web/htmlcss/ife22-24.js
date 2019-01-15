function compa(val1, val2) {
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}
function compa1(val1, val2) {
    if (val1 < val2) {
        return 1;
    } else if (val1 > val2) {
        return -1;
    } else {
        return 0;
    }
}
var arr = [43, 54, 4, -4, 84, 100, 58, 27, 140];
var arr1 = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];
console.log(arr.sort(compa));
console.log(arr1.sort(compa));
console.log(arr.sort(compa1));
console.log(arr1.sort(compa1));

function compa2(i) {
    return function (arr1, arr2) {
        var val1 = arr1[i],
            val2 = arr2[i];
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
}
var arr2 = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
var arr3 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];
console.log(arr3.sort(compa2('value')).reverse())

//对象转化为数组
function convert(obj) {
    var arr = [];
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            var n = [];
            n.push(name);
            for (var course in obj[name]) {
                if (obj[name].hasOwnProperty(course)) {
                    n.push(obj[name][course]);
                }
            }
        }
        arr.push(n);
    }
    return arr;
}
var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    },
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    },
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}
console.log(convert(scoreObject));

//数组转化为对象    [key,name,parent]
var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
var menuObject = {};
function findParent(obj, id) {
    var parent = null;
    for (var key in obj) {
        if (key == id) { //找到父元素
            parent = obj[key];
            break;
        }
        else if (obj[key].subMenu) { //向子元素查找
            parent = findParent(obj[key].subMenu, id);
            if (parent)
                break;
        }
    }
    return parent;
}
for (var i in menuArr) {
    var cKey = menuArr[i][0].toString(); //自己结点的key
    var nameVal = menuArr[i][1];
    var pKey = menuArr[i][2].toString(); //父结点的key
    if (pKey == -1) {
        menuObject[cKey] = {}; //-1说明是根节点
        menuObject[cKey].name = nameVal;
    }
    else { //寻找父节点
        var parent = findParent(menuObject, pKey);
        //					console.log(JSON.stringify(parent) + "父节点" + pKey);
        if (!parent.subMenu) { //创建当前结点
            parent.subMenu = {};
        }
        parent.subMenu[cKey] = {};
        parent.subMenu[cKey].name = nameVal;
    }
}
console.log("数组转换后的对象为：" + JSON.stringify(menuObject));