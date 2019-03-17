function shellSort(arr) {
    var len = Math.floor(arr.length / 2);     //一般分成2^k -1 份  效率高一点
    while (len > 0) {
        var i = 0;
        while (i < len) {
            gapInsertionSort(arr, i, len);
            i++;
        }
        len = Math.floor(len / 2);
    }
    return arr;
}

function gapInsertionSort(arr, start, gap) {
    var i = start + gap;
    while (i < arr.length) {
        var currentValue = arr[i];
        var pos = i;
        while (pos >= gap && currentValue < arr[pos - gap]) {
            arr[pos] = arr[pos - gap];
            pos = pos - gap;
        }
        arr[pos] = currentValue;
        i = i + gap;
    }
    return arr;
};
console.log(shellSort([5, 4, 3, 2, 1, 9, 9, 10, 11]))