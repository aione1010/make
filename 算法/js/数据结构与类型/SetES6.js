// ES6中，有Set类；其中，values属性，输出的是Iterator


let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

//模拟并集

let unionAb = new Set();
for(let value of setA) unionAb.add(value);
for(let value of setB) unionAb.add(value);


//模拟交集

let intersection = function(setA,setB){
    let intersectionAB = new Set();
    for(let x of setA){
        if(setB.has(x)){
            intersectionAB.add(x);
        }
    }
    return intersectionAB;
};

console.log(intersection(setA,setB));

//模拟差集

let difference = function(setA,setB){
    let differenceAB = new Set();
    for(let x of setA){
        if(!setB.has(x)){
            differenceAB.add(x);
        }
    }
    return differenceAB;
};

console.log(difference(setA,setB));
