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
               count++;
           }
       }
       return count;
   };
   this.size1 = function(){//ES5及以上适用；
       let count = 0;
       return Object.keys(items).length;
   };
   this.values = function(){
       let values=[];
       for(let key in items){
           if(items.hasOwnProperty(key)){
               values.push(key);
           }
       }
       return values;
   };
   this.values1 = function(){//ES5及以上适用；
       let values = [];
       for(let i = 0,keys=Object.keys(items);i<keys.length;i++){
           values.push(items[keys[i]]);
       }
       return values;
   };
}

let set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.delete(2);
console.log(set.values());
console.log(set.size());
set.clear();
console.log(set.size());
console.log(set.has(2));