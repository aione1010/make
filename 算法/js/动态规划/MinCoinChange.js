function MinCoinChange(coins) {
    var cache = {};
    this.makeChange = function (amount) {
        var me = this;
        if (!amount) {
            return [];
        }
        if (cache[amount]) {
            return cache[amount];
        }
        var min = [],
            newMin,
            newAmount,
            i;
        for (i = 0; i < coins.length; i++) {
            var coin = coins[i];
            newAmount = amount - coin;
            if (newAmount >= 0) {
                newMin = me.makeChange(newAmount);
            }
            if (newAmount >= 0 &&
                (newMin.length < min.length - 1 || !min.length) &&
                (newMin || !newAmount)) {
                min = [coin].concat(newMin);
            }
        }
        return (cache[amount] = min);
    };
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));