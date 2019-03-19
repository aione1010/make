function binarySearch(item, array) {
    //二分搜索的数组要求是排好序的数组；
    quickSort(array);
    var low = 0,
        high = array.length - 1,
        mid,
        element;

    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        element = array[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

var partition = function (array, first, end) {
    var pivot = array[first],
        leftmark = first + 1,
        rightmark = end,
        done = false;
    while (!done) {
        while (leftmark <= rightmark && array[leftmark] <= pivot) {
            leftmark++;
        }
        while (leftmark <= rightmark && array[rightmark] >= pivot) {
            rightmark--;
        }
        if (leftmark > rightmark) {
            done = true;
        }else{
            [array[leftmark],array[rightmark]] = [array[rightmark],array[leftmark]];
        }
    }
    [array[rightmark],array[first]] = [array[first],array[rightmark]];

    return rightmark;
};

var quickSortHelper=function(array,first,end){
    var index;
    if (first < end){
        index = partition(array,first,end);
        quickSortHelper(array,first,index - 1);
        quickSortHelper(array,index + 1,end);
    }
    return array;
};

function quickSort(array){
    return quickSortHelper(array,0,array.length-1);
}

var alist = [54, 26, 93, 17, 77, 31, 44, 55, 20];
console.log(binarySearch(20,alist))