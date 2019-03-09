/*
*给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

*注意：答案中不可以包含重复的三元组。

*例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

*满足要求的三元组集合为：
*[
* [-1, 0, 1],
*  [-1, -1, 2]
*]
*/ 
let threeSum = function(nums) {
    let res = [];
    let length = nums.length;
    nums.sort((a, b) => a - b);
    if(len<3){
        return res;
    }
    if (nums[0] <= 0 && nums[length - 1] >= 0) {
        for (let i = 0; i < length - 2; i++) {
            let j = i + 1;
            let k = length - 1;
            while (j < k) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    res.push([nums[i], nums[j], nums[k]]);
                    while (j < k && nums[j] === nums[j + 1]) {
                        j++;
                    }
                    while (j < k && nums[k] === nums[k - 1]) {
                        k--;
                    }
                    j++;
                    k--;
                } else if (nums[i] + nums[j] + nums[k] < 0) {
                    j++;
                } else {
                    k--;
                }
            }
            while (i < length - 2 && nums[i] === nums[i + 1]) {
                i++;
            }
        }
    }
    return res;
};

/*
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：

给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    var res=[],len=nums.length;
    nums.sort((a,b)=>a-b);
    if(len<4){
        return res;
    }
    for(var i =0;i<len-3;i++){
        for(var j=i+1;j<len-2;j++){
            var k=j+1,
                m=len-1;
            while(k<m){
                if(nums[i]+nums[j]+nums[k]+nums[m]===target){
                    res.push([nums[i],nums[j],nums[k],nums[m]]);
                    while(k<m && nums[k]===nums[k+1]){
                        k++;
                    }
                    while(k<m && nums[m]===nums[m-1]){
                        m--;
                    }
                    k++;
                    m--;
                }else if(nums[i]+nums[j]+nums[k]+nums[m]<target){
                    k++;
                }else{
                    m--;
                }
            }
            while(j<len-2 && nums[j]===nums[j+1]){
                j++;
            }
        }
        while(i<len-3 && nums[i]===nums[i+1]){
            i++;
        }
    }
    return res;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if(nums.length < 4) {
        return [];
    }
    var res = [];
    nums.sort(function(a,b) {
        return a - b;
    })
    for(var i = 0; i <= nums.length - 3; i++) {
        if(i > 0 && nums[i - 1] === nums[i]) {
            continue;
        }
        for(var j = i + 1; j <= nums.length - 2 ;j++) {
            if(j > i + 1 && nums[j - 1] === nums[j]) {
                continue;
            }
            var ret = target - nums[i] - nums[j];
            var l = j + 1,
                r = nums.length - 1;
            while(l < r) {
                if(nums[l] + nums[r] > ret) {
                    r--
                } else if(nums[l] + nums[r] < ret){
                    l++
                } else {
                    res.push([nums[i],nums[j],nums[l],nums[r]])
                    l++
                    r--
                    while(l < r && nums[l] === nums[l - 1]) {
                        l++
                    }
                    while(r < nums.length - 1 && nums[r] === nums[r + 1]) {
                        r--
                    }
                }
            }
        }
    }
    return res;
};