function bubbleSort(arr){
    for(var i=arr.length - 1; i > 0; i--){
        for(var j = 0;j < i;j++){
            if(arr[j] > arr[j+1]){
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j+1] = tmp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([1,2,3,5,7,0,2,3,5,7,8]))