$(document).ready(function(){                  //下拉菜单
    $('.mainlevel').mouseenter(function(){
        $(this).find('ul').slideDown();
    });
    $('.mainlevel').mouseleave(function(){
        $(this).find('ul').slideUp('fast');
    });
})

//图片轮播
$(document).ready(function(){
    $('#slide').jdSlide({
        width:1025,
        height:356,
        pics:[
            {src:'image/spring.jpg',href:'http://news.ucas.ac.cn/index.php/gygk',alt:'',type:'img'},
            {src:'image/175355_128385.11.jpg',href:'http://news.ucas.ac.cn/index.php?option=com_content&view=article&id=490416&catid=340&Itemid=176',alt:'',type:'img'},
            {src:'image/210723_354360.12.jpg',href:'http://news.ucas.ac.cn/index.php?option=com_content&view=article&id=490379&catid=396&Itemid=310',alt:'',type:'img'},
            {src:'image/163154_992032.jpg',href:'http://news.ucas.ac.cn/index.php?option=com_content&view=article&id=489942&catid=340&Itemid=176',alt:'',type:'img'},
            {src:'image/135156_828418._20190104135048.jpg',href:'http://news.ucas.ac.cn/index.php?option=com_content&view=article&id=489741&catid=396&Itemid=310',alt:'',type:'img'},
        ]
    })
})