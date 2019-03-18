var partition = function (array, first, last) {
    var leftmark = first + 1,
        rightmark = last,
        pivotValue = array[first],
        done = false;
    while (!done) {
        while (array[leftmark] <= pivotValue && leftmark <= rightmark) {
            leftmark++;
        }
        while (array[rightmark] >= pivotValue && leftmark <= rightmark) {
            rightmark--;
        }
        if (leftmark > rightmark) {
            done = true;
        } else {
            [array[rightmark], array[leftmark]] = [array[leftmark], array[rightmark]];
        }
    }
    [array[rightmark], array[first]] = [array[first], array[rightmark]];  //rightmark左边的都小于pivotValue,右侧都大于pivotValue

    return rightmark;   //rightmark作为分界点，将待排序列分成两部分
}


var quickHelper = function (array, first, last) {
    var index;
    if (first < last) {
        index = partition(array, first, last);
        quickHelper(array, first, index - 1);
        quickHelper(array, index + 1, last);
    }
    return array;
};

function quickSort(array) {
    return quickHelper(array, 0, array.length - 1);
}

var alist = [54, 26, 93, 17, 77, 31, 44, 55, 20];
console.log(quickSort(alist));