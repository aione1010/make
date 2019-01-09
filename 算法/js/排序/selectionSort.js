function selectionSort(arr){
    var len = arr.length,
        indexMin;
    for(var i = 0; i < len;i++){
        indexMin = i;
        for(var j = i; j < len;j++){
            if(arr[indexMin] > arr[j]){
                indexMin = j;
            }
        }
        if(indexMin !== i){
            var tmp = arr[indexMin];
            arr[indexMin]=arr[i];
            arr[i] = tmp;
        }
    }
    return arr;
}
console.log(selectionSort(([0,9,8,2,4,1,5,7,2,8,9])))