//下拉菜单
$(document).ready(function(){                  
    $('.mainlevel').mouseenter(function(){
        $(this).find('ul').slideDown();
    });
    $('.mainlevel').mouseleave(function(){
        $(this).find('ul').slideUp('fast');
    });
})

//图片轮播
var t = n = 0, count;
$(document).ready(function(){
    var len=$('#slide ul li').length,
    timer,
    first=0;
    //初始化
    //隐藏图片，显示第一个
    $('#slide').hide().eq(0).show();
    $('#slide span').eq(0).addClass('cur');
    $('#slide div span').hover(function(){
        var x = $(this).index();
        change(x);
    });
    $('.o-control').click(function(){   
        var x=first;
        if($(this).index()){
            x++;
            x %= len;
        }else if($(this).index()){
            x--;
            if(x<0){
                x=len-1;
            }
        }
        change(x);
    });
    auto();
    $('.boxx').hover(function(){
        clearInterval(timer);
    },auto);
    function auto(){
        timer = setInterval(function(){
            var x = first;
            x++;
            x %= len;
            change(x);
        },2000)
    }
    function change(i){
        $('#slide span').eq(first).removeClass('cur');
        first = i;
        va=first*(-1024)+'px'
        $('#slide ul').animate({left:va},350);
        $('#slide span').eq(first).addClass('cur');
    }
});