function bubbleSort(arr){
    var len = arr.length;
    for(var i = len - 1; i > 0; i--){
        for(var j = 0; j < i; j++){
            if(arr[j] > arr[j + 1]){
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([54,56,85,91,20,3,26,59,22,30,20,20,20]));