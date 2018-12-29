function HashTable(){
    var table = [];
    
    var loseloseHashCode = function(key){       //把key的每个字母的ASCII码相加，获得的和就是hash
        var hash = 0;
        for (var i = 0; i < key.length; i ++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;                     //为了得到一个比较小的数，可以把hash值和任意数相除得余数。
    };

    this.put = function(key,value){
        var pos = loseloseHashCode(key);
        //console.log(position + ' - ' + key);
        table[pos] = value;
    };

    this.get = function(key){
        return table[loseloseHashCode(key)];
    };

    this.remove = function(key){
        table[loseloseHashCode(key)] = undefined;
    };

    this.print = function(){
        for(var i = 0;i < table.length; i++){
            if(!table[i]==undefined){
                console.log(i + ':' + table[i]);
            }
        }
    };

}