function goback()
{
    var url = document.location.href
    if (url.includes('?'))
        window.location.replace("index.html");
}

var isNavBarInView;

$(document).ready(function(){
    isNavBarInView = true;

});

window.onresize = function()
{
    var width = $(window).width();
    
    if (width>768)
    {
        $('.small-screen-navbar-container').css('visibility','hidden');
    }
    else{
        $('.small-screen-navbar-container').css('visibility','visible');
    }
}

function displayVerticalNavBar()
{
    isNavBarInView = !isNavBarInView;

    if (isNavBarInView)
    {
        $('.small-nav-line-mid').css({'animation-name':'mid-line-arrive', 'animation-duration':'0.3s', 'animation-fill-mode':'forwards'});
        $('.small-nav-line-top').css({'animation-name':'rotate-anticlockwise-straight', 'animation-duration':'0.8s', 'animation-fill-mode':'forwards'});
        $('.small-nav-line-bottom').css({'animation-name':'rotate-clockwise-straight', 'animation-duration':'0.8s', 'animation-fill-mode':'forwards'});

        setTimeout(function(){
            $('.small-screen-navbar-container').css('animation-name','small-navbar-anim-close');
            setTimeout(function(){$('.navitem-small-screen').css('display','none');},10);
        },100);   
    }
        
    else {
        $('.small-nav-line-mid').css({'animation-name':'mid-line-leave', 'animation-duration':'0.3s', 'animation-fill-mode':'forwards'});
        $('.small-nav-line-top').css({'animation-name':'rotate-clockwise-cross', 'animation-duration':'0.8s', 'animation-fill-mode':'forwards'});
        $('.small-nav-line-bottom').css({'animation-name':'rotate-anticlockwise-cross', 'animation-duration':'0.8s', 'animation-fill-mode':'forwards'});

        setTimeout(function(){
            $('.small-screen-navbar-container').css('animation-name','small-navbar-anim-open');
            setTimeout(function(){$('.navitem-small-screen').css('display','flex');},400);
        }, 100);
        
    }     
}

    