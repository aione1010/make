function Set(){
    let items = {};

   this.has = function(value){
       return items.hasOwnProperty(value);
   };
   this.add = function(value){
       if(!this.has(value)){
           items[value] = value;
           return true;
       }
       return false;
   };
   this.delete = function(value){
       if(this.has(value)){
           delete items[value];
           return true;
       }
       return false;
   };
   this.clear = function(){
       items = {};
   };
   this.size = function(){
       let count = 0;
       for(let key in items){
           if(items.hasOwnProperty(key)){
               count ++;
           }
       }
       return count;
   };
   this.size1 = function(){    //最新浏览器支持，老的可能不支持，ES5及以上；
       return Object.keys(items).length;
   };

   this.values = function(){
       let values = [];
       for(let key in items){
           if(items.hasOwnProperty(key)){
               values.push(key);
           }
       }
       return values;
   };

   this.values1 = function(){    //最新浏览器支持，老的可能不支持，ES5及以上；
       let values = [];
       for(let i = 0, keys = Object.keys(items);i<keys.length;i++){
           values.push(items[keys[i]]);
       }
       return values;
   };

   this.union = function(otherSet){   //并集
       let unionSet = new Set();
       let values = this.values();
       for(let i = 0; i < values.length; i ++){
           unionSet.add(values[i]);
       }
       values = otherSet.values();
       for(let i = 0; i < values.length; i ++ ){
           unionSet.add(values[i]);
       }
       return unionSet;
   };

   this.intersection = function(otherSet){   //交集
       let intersectionSet = new Set();
       let values = this.values();
       for(let i = 0; i < values.length; i ++){
           if(otherSet.has(values[i])){
               intersectionSet.add(values[i]);
           }
       }
       return intersectionSet;
   };

   this.difference = function(otherSet){  //差集
       let differenceSet = new Set();
       let values = this.values();
       for(let i = 0; i< values.length; i ++){
           if(!otherSet.has(values[i])){
               differenceSet.add(values[i]);
           }
       }
       return differenceSet;
   };

   this.subset = function(otherSet){    //子集
       if(this.size() > otherSet.size()){
           return false;
       }else{
           let values = this.values();
           for(let i = 0; i < values.length; i ++){
               if(!otherSet.has(values[i])){
                   return false;
               }
           }
           return true;
       }
   };
}

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(1);
setB.add(3);
setB.add(4);
setB.add(5);

console.log(setA.union(setB).values());
console.log(setA.intersection(setB).values());
console.log(setA.difference(setB).values());
console.log(setA.subset(setB));



