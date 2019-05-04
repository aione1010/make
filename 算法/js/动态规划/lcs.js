function lcs(wordX, wordY) {
    var xl = wordX.length,
        yl = wordY.length,
        l = [], i, j, a, b;

    for (i = 0; i <= xl; i++) {
        l[i] = [];
        for (j = 0; j <= yl; j++) {
            l[i][j] = 0;
        }
    }

    for(i = 0; i <= xl; i++){
        for(j = 0; j <= yl; j++){
            if(i==0||j==0){
                l[i][j]==0;
            }else if(wordX[i-1]===wordY[j-1]){
                l[i][j]=l[i-1][j-1]+1
            }else{
                a=l[i-1][j];
                b=l[i][j-1];
                l[i][j]=Math.max(a,b)
            }
        }
    }
    return l[xl][yl];
}


console.log(lcs('acbacd','abcadf'))