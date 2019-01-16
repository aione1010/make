function GoSteps(n){
    if(!isNaN(n)){
        var num = parseInt(n);
        while(num > 0){
            console.log('Go');
            num--;
        }
    }else if (typeof n =='undefined'){
        console.log('Go');
    }
}
GoSteps(null)