function merge(left,right){
    var result=[],
    i=0,
    j=0;
    while(i<left.length && j < right.length){
        if (left[i] < right[j]){
            result.push(left[i++]);
        }else{
            result.push(right[j++]);
        }
    }
    while(i<left.length){
        result.push(left[i++]);
    }
    while (j< right.length){
        result.push(right[j++]);
    }
    return result;
}

function sort(arr){
    var len = arr.length;
    if(arr.length<=1){
        return arr;
    }else{
        var mid = Math.floor(len / 2),
        leftHalf = arr.slice(0,mid),
        rightHalf = arr.slice(mid,len);
        return merge(sort(leftHalf),sort(rightHalf));
    }
}

var alist = [54,26,93,17,77,31,44,55,20];
console.log(sort(alist));