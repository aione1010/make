function HashTableSeparateChaining(){
    var table = [];

    var ValuePair = function(key,value){
        this.key = key;
        this.value = value;
        this.toString = function(){
            return '[' + this.key + '-' + this.value + ']';
        }
    };

    var loseloseHashCode = function(key){
        var hash = 0;
        for (var i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };

    this.put = function(key,value){
        var pos = loseloseHashCode(key);
        if(table[pos] === undefined){
            table[pos] = new LinkedList();
        }
        table[pos].append(new ValuePair(key,value));
    };

    this.get = function(key){
        var pos = loseloseHashCode(key);

        if
    }
}