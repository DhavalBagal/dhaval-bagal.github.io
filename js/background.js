var workexp_heading_in_view_prev;
var isNavBarInView;

function linedraw(x1, y1, x2, y2, animate) {
    if (x2 < x1) {
        tmp = x2 ; x2 = x1 ; x1 = tmp
        tmp = y2 ; y2 = y1 ; y1 = tmp
    }

    lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    m = (y2 - y1) / (x2 - x1)

    degree = Math.atan(m) * 180 / Math.PI

    var myobj = document.getElementById("timeline-line");

    if (myobj!=null)
    {
        myobj.remove();
    }

    if (animate)
        document.body.innerHTML += "<div id ='timeline-line' class='line' \
                                style='transform-origin: top left; \
                                transform: rotate(" + degree + "deg); \
                                width: " + lineLength + "px; \
                                height: 4px; \
                                background: #28292B; \
                                position: absolute; \
                                top: " + y1 + "px; \
                                left: " + x1 + "px; \
                                animation-name: timeline-animate;\
                                animation-duration: 2s' ></div>"
    else
        document.body.innerHTML += "<div id ='timeline-line' class='line' \
                                style='transform-origin: top left; \
                                transform: rotate(" + degree + "deg); \
                                width: " + lineLength + "px; \
                                height: 4px; \
                                background: #28292B; \
                                position: absolute; \
                                top: " + y1 + "px; \
                                left: " + x1 + "px;' ></div>"

    
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

    return isVisible;
}



animateTimeline = function () {
    
    var divs = document.getElementsByClassName("timeline-breakpoint");
    var workexp_heading = document.getElementById("work-experience");

    workexp_heading_in_view_now = isScrolledIntoView(workexp_heading);

    var line = document.getElementById("timeline-line");

    if (line!=null && workexp_heading_in_view_now==false)
    {
        line.remove();
        workexp_heading_in_view_prev==false;
    }

    if (workexp_heading_in_view_now)
    {
            for(var i = 0; i < divs.length-1; i++) {

                offset = 0;
                targetNode = divs[i]
                x1 = targetNode.offsetLeft + targetNode.offsetWidth / 2 + offset;
                y1 = targetNode.offsetTop + targetNode.offsetHeight / 2;
                
                nextNode = divs[i+1]
                x2 = nextNode.offsetLeft + nextNode.offsetWidth / 2 + offset;
                y2 = nextNode.offsetTop + nextNode.offsetHeight / 2;
                if (workexp_heading_in_view_prev==false)
                    linedraw(x1, y1, x2, y2, true);
            }
            workexp_heading_in_view_prev = true;
    }
    else
        workexp_heading_in_view_prev = false;
};

drawTimeline = function()
{
    var divs = document.getElementsByClassName("timeline-breakpoint");
    var workexp_heading = document.getElementById("work-experience");
    for(var i = 0; i < divs.length-1; i++) {

        offset = 0;
        targetNode = divs[i]
        x1 = targetNode.offsetLeft + targetNode.offsetWidth / 2 + offset;
        y1 = targetNode.offsetTop + targetNode.offsetHeight / 2;
        
        nextNode = divs[i+1]
        x2 = nextNode.offsetLeft + nextNode.offsetWidth / 2 + offset;
        y2 = nextNode.offsetTop + nextNode.offsetHeight / 2;

        linedraw(x1, y1, x2, y2, false);
    }
}


adjustTimeline = function()
{
    var myobj = document.getElementById("timeline-line");
    if (myobj!=null)
    {
        myobj.remove();
        drawTimeline();
    }

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

window.onload = function(event) {
    isNavBarInView = true;
    workexp_heading_in_view_prev = isScrolledIntoView(document.getElementById("work-experience"));
    animateTimeline();
};

window.addEventListener('resize', adjustTimeline);
window.addEventListener('scroll', animateTimeline);
