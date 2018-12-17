//最长无重复字符串长度

var lengthOfLongestSubstring = function(s) {
    var str1='';
    var nums=0,
        max_num = 0;
    for (var i=0 ; i < s.length;i++){
        if(s.indexOf(s.charAt(i)) < 0){
            str1 += s.charAt(i);
            num ++;
        }else{
            if (nums>max_num){
                max_num = nums;
            }
            index_i = str1.indexOf(s.charAt(i));
            str1 = str1.slice(index_i+1)+s.charAt(i);
            nums=str1.length;
        }
    }
    if (nums>max_num){
        max_num = nums;
    }
    return max_num
};