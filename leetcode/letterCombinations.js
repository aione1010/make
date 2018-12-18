
//方法一
var f1=function(str1,str2){
    var arr = []
    for(var i=0;i<str1.length;i++){
        for(var j=0;j<str2.length;j++){
            arr.push(str1[i]+str2[j]); 
        }
    }
    return arr;
}
var letterCombinations = function(digits) {
    var dic=['abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'];
    if(digits.length==0){
        return [];
    }if(digits.length==1){
        var arr=[];
        var str_1=dic[parseInt(digits)-2],
            len=str_1.length;
        for(var i=0; i<len; i++){
            arr.push(str_1[i]);
        }
        return arr
    }else{
        return f1(dic[parseInt(digits[0])-2],letterCombinations(digits.slice(1)))
    }
};

//方法二
let letterCombinations = function(digits) {
    if (digits === '') return [];
    let dict = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    let res = [''];
    for (let digit of digits) {
        let len = res.length;
        while (len-- > 0) {
            let e = res.shift();
            for (let c of dict[digit]) {
                res.push(e + c);
            }
        }
    }
    return res;
};