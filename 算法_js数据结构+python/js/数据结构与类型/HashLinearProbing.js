function HashLinearProbing(){
    var table = [];
    var loseloseHashCode = function(key){
        var hash = 0;
        for(var i = 0; i < key.length; i ++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    var ValuePair = function(key,value){
        this.key = key;
        this.value = value;

        this.toString = function(){
            return '[' + this.key + '-' + this.value + ']' ;
        };
    };

    this.put = function(key,value){
        var pos = loseloseHashCode(key);

        if(table[pos] === undefined){
            table[pos] = new ValuePair(key,value);
        }else{
            var index = pos ++ ;
            while(table[index] !== undefined){
                index ++;
            }
            table[index] = new ValuePair(key,value);
        }
    };

    this.get = function(key){
        var pos = loseloseHashCode(key);

        if(table[pos] !== undefined){
            if(table[pos].key === key){
                return table[pos].value;
            }else{
                var index = pos++;
                while(table[index] === undefined || table[index].key !== key){
                    index ++ ;
                }
                if(table[index].key === key){
                    return table[index].value;
                }
            }
        }
        return undefined;
    };

    this.remove = function(key){
        var pos = loseloseHashCode(key);

        if(table[pos] !== undefined){
            if(table[pos].key === key){
                table[pos].key = undefined;
                return true;
            }else{
                var index = pos++;
                while(table[index] === undefined || table[index].key !== key){
                    index ++;
                }
                if(table[index].key === key){
                    table[index].key = undefined;
                    return true;
                }
            }
        }
        return false;
    }
}