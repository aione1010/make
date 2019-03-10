/*
给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

示例 :

输入: [1,2,1,3,2,5]
输出: [3,5]
注意：

结果输出的顺序并不重要，对于上面的例子， [5, 3] 也是正确答案。
你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    var a=0,b=0,c=0;
    for(var i=0;i<nums.length;i++){
        a ^= nums[i];
    }
    n=a.toString(2).length-1;        //例如a=6，a.toString(2).length-1=2,
    for(var j=0;j<nums.length;j++){
        if(nums[j] >> n &1){         //通过位操作符&，将右移2位的数，分成最高位有1和无1的两部分
            b ^= nums[j];           
        }else{
            c ^= nums[j];
        }
    }
    return [b,c];
};

var singleNumber1 = function(nums) {
    var a=0,b=0;
    for(var i=0;i<nums.length;i++){
        b=~a &(b^nums[i]);
        a=~b&(a^nums[i]);
    }
    return b;
};