var heapify = function (array, heapSize, i) {
    var left = i * 2 + 1,
    right = i * 2 + 2,
    largest = i;
    if(left < heapSize && array[left] > array[largest]){
        largest = left;
    }
    if(right < heapSize && array[right] > array[largest]){
        largest = right;
    }
    if(largest !== i){
        [array[i],array[largest]] = [array[largest],array[i]];
        heapify(array,heapSize,largest);
    }
    return array;
};

var buildHeap = function(array){
    var heapSize = array.length;
    for(var i=Math.floor(array.length / 2);i>=0;i--){
        heapify(array,heapSize,i);
    }
    return array;
};

function heapSort(array){
    var heapSize = array.length;
    buildHeap(array);

    while(heapSize > 1){
        heapSize--;
        [array[0],array[heapSize]] = [array[heapSize],array[0]];
        heapify(array,heapSize,0);
    }
    return array;
}

console.log(heapSort([3, 5, 1, 6, 4, 7, 2]))