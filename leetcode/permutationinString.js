//字符串的排列；
/*
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
换句话说，第一个字符串的排列之一是第二个字符串的子串。
*/

var checkInClusion = function (s1, s2) {
    if (s1.length > s2.length) {
        return false;
    }
    let arr = Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        arr[s1.charCodeAt(i) - 97]++;
        arr[s2.charCodeAt(i) - 97]--;
    }
    for (let i = s1.length; i < s2.length; i++) {
        if (arr.every(val => val == 0)) {
            return true;
        } else {
            arr[s2.charCodeAt(i) - 97]--;
            arr[s2.charCodeAt(i - s1.length) - 97]++;
        }
    }
    return arr.every(val => val === 0);
}
console.log(checkInClusion('ab', 'eidbaooo'));