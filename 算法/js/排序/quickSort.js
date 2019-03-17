function quickSort(arr,left,right){
    var index;
    if(arr.length > 1){
        index = partition(arr,left,right);
        if(index - 1 > left){
            quickSort(arr,left,index - 1);
        }
        if(index < right){
            quickSort(arr,index,right);
        }
    }
    return arr;
}

function partition(arr,left,right){
    var pivot = arr[Math.floor((left + right) / 2)],
    i = left,
    j = right;
    while(i <= j){
        while(arr[i]<pivot){
            i++;
        }
        while(arr[j]>pivot){
            j--;
        }
        if(i <= j){
            [arr[i],arr[j]] = [arr[j],arr[i]];
            i++;
            j--;
        }
    }
    return i;
}

function sort(arr){
    return quickSort(arr,0,arr.length-1);
}

var alist = [54,26,93,17,77,31,44,55,20];
console.log(sort(alist));