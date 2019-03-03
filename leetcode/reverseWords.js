var reverseWords = function(str) {
    var a=str.replace(/\s+/g,' ');
    if(a == ' '){
        return '';
    }if(a == ''){
        return '';
    }else{
        b=a.trim();
        var arr = b.split(' ').reverse();
        return arr.join(' ');
    }
};

var reverseWords = function(str) {
    return str.trim().replace(/\s+/g,' ').split(' ').reverse().join(' ')
};