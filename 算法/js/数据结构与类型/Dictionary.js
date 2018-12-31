function Dictionary(){
    var items = {};

    this.has = function(key){
        return items.hasOwnProperty(key);  // return key in items;
    };

    this.set = function(key,value){
        items[key] = value;                //添加或者更新值
    };

    this.delete = function(key){
        if (this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };

    this.get = function(key){             //找出字典键对应的值
        return this.has(key) ? items[key] : undefined;
    };

    this.values = function(){             //将字典所包含的所有数值以数组形式返回
        var values = [];
        for (var k in items){
            if(this.has(k)){
                values.push(items[k]);
            }
        }
        return values;
    };

    this.clear = function(){
        items = {};
    };

    this.size = function(){
        var count = 0;
        for(var key in items){
            if (this.has(key)){
                count ++;
            }
        }
        return count;
    };

    this.keys = function(){
        var keys = [];
        for(var k in items){
            if (this.has(k)){
                keys.push(k);
            }
        }
        return keys;
    };

    this.keys1 = function(){   //ES5以及以上
        return Object.keys(items);
    };

    this.getItems = function(){
        return items;
    };
}

var dic = new Dictionary();
dic.set('mk','mk@imech.ac.cn');
dic.set('lxw','lxw@qq.com');
console.log(dic.getItems());
console.log(dic.keys());
