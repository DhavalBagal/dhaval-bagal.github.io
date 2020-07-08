var isNavBarInView;
function isFloat(val) {
    if (val.includes('.')) return true;
    else return false;
}

function isInt(val) {
    if (val.includes('.')) return false;
    else return true;
}

animateScores = function()
{
    var elems = document.getElementsByClassName('numerator-score');
    var nums = []
    var numStrings = []
    var isNumFloat = []
    max = 0;

    for(var j = 0; j < elems.length; j++) 
    {
        if (isFloat(elems[j].textContent))
        {
            num = parseFloat(elems[j].textContent);
            isNumFloat.push(true);
        }
        else if(isInt(elems[j].textContent))
        {
            num = parseInt(elems[j].textContent);
            isNumFloat.push(false);
        }
        numStrings.push(elems[j].textContent);
        nums.push(num);

        if (num>max) max=num;
    }

    var i=0, anim;

    anim = setInterval(function(){
        
        for(var j = 0; j < elems.length; j++) 
        {
            if (i<=nums[j])
            {
                counter = i.toString();
                if (isNumFloat[j])
                    elems[j].innerText = counter+".00";
                else
                {
                    if (counter.length==1) elems[j].innerText = '0'+counter;
                    else if (counter.length==2) elems[j].innerText = counter;
                }
            }
            
        }
        if(i>max) 
        {
            for(var j = 0; j < elems.length; j++) 
            {
                elems[j].innerText = numStrings[j];
            }
            clearInterval(anim);
        }
        i+=1;
    },50);
}


displayScores = function(callback)
{
    var ip ='dhavalbagal.github.io'

    $.getJSON("https://"+ip+"/data.json", function(data){
        scores = data.scores;
        for (var key in scores) 
        {
            score = scores[key];
            elem = 
            "<div class='row' style='justify-content: center; align-items: flex-start;' >\
                <div class='score-figure-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                    <span class='numerator-score'>"+score['score']+"</span>\
                    <span class='denominator-score'>"+score['out-of']+"</span>\
                </div>\
                <div class='score-info-container col-xs-24 col-sm-24 col-md-24 col-lg-20 col-xl-16 col-xxl-16' style='flex-direction: column; justify-content: center;'>\
                    <span class='score-title'> "+score['title']+" </span>\
                    <span class='score-date col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10'> "+score['date']+" </span>\
                </div>\
            </div>" 
                

            $("#scores-heading-row").after(elem);
        }
    });

    setTimeout(function() {
        callback();
      }, 50);
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

window.onload = function()
{
    isNavBarInView = true;
    displayScores(animateScores);
}

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

   