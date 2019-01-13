function insertionSort(arr){
    var len = arr.length,
        currentValue,
        pos;
    for(var i = 0; i < len; i++){
        currentValue = arr[i];
        pos = i;
        while (pos > 0 && arr[pos - 1] > currentValue){
            arr[pos] = arr[pos - 1];
            pos = pos - 1;
        }
        arr[pos] = currentValue;
    }
    return arr;
}

console.log(insertionSort([54,56,85,91,20,3,26,59,22,30,20,20,20]));