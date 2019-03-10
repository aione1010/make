function createXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XHLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
        if(typeof arguments.callee.ActiveXString != 'string'){
            var versions=["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
            i,len;
            for(i=0;i<versions.length;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.ActiveXString = versions[i];
                    break;
                }catch(ex){

                }
            }
        }
        return new ActiveXObject(arguments.callee.ActiveXString);
    }else{
        throw new Error('No XHR object avaliable.');
    }
}
var xhr = createXHR();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status<300 || xhr.status==304){
            alert(xhr.responseText);
        }else{
            alert('Request was unsuccessful:'+xhr.status);
        }
    }
};
xhr.open('get','example.txt',true);
xhr.send(null);