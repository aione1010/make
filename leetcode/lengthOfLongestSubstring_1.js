var lengthOfLongestSubstring = function(s) {
    var str1='',maxLength=0;
    for(var i=0;i<s.length;i++){
        var index_i = str1.indexOf(s[i]);
        if(~index_i){
            str1 = str1.slice(index_i+1);
        }
        str1 += s[i];
        if(str1.length > maxLength){
            maxLength=str1.length;
        }
    }
    return maxLength;
};

//不存在时候，index_i = -1 ,~index_i =-(index_i+1),Boolean(0)是false