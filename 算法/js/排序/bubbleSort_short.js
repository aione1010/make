function bubbleSort_short(arr){
    var exchange = true,
        i = arr.length - 1;
    while(i > 0 && exchange){
        exchange = false;
        
        for(var j = 0; j < i ; j++){
            if(arr[j] > arr[j+1]){
                exchange = true;
                var tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
        i --;
    }
    return arr;
}

console.log(bubbleSort_short([54,56,85,91,20,3,26,59,22,30,20,20,20]));