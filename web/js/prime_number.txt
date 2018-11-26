var n=6;
var s=[4,6,8,12,16,20];
function judge(num){
if (num == 1 || num == 2){
    return false;
 }else{
   for (var i=3;i<num/2+1;i++){
     if (num % i == 0){
       return false;
     } 
   }
 }
return true;
}
var count =[];
for (var i=0; i<n-1;i++){
  var c=0,
      start = s[i],
      end=s[i+1];
  for(var j =start+1; j<end;j++){
    if (judge(j)){
      c += 1;
    }
  }
  count.push(c);
}
var sum = 0;
for(var k =0;k<n-1;k++){
  sum += count[k] * (k+1)*(n-k-1);
}
alert(sum)