$(document).ready(function(){
    $('.mainlevel').mouseenter(function(){
        $(this).find('ul').slideDown();
    });
    $('.mainlevel').mouseleave(function(){
        $(this).find('ul').slideUp('fast');
    });
})