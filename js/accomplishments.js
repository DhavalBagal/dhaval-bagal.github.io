var prevElem, prevHeading, data;
var isNavBarInView;

expandInfo = function(target)
{
    /* var elems = document.getElementsByClassName('accomplishment-info')

    for(var i = 0; i < elems.length-1; i++) 
    {
        prevElem.style.display="none";
    } */

    if (prevElem!=null)
    {
        prevElem.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
    }
       
    
    info = target.nextElementSibling.nextElementSibling.nextElementSibling;
    if (info!=null)
    {
        info.style.display = "flex";
        prevElem = target;
    }
}

animateAccomplishmentNumbers = function()
{
    var elems = $('.number-of-accomplishments');
    var nums = []

    max = 0;

    for(var j = 0; j < elems.length; j++) 
    {
        num = parseInt(elems[j].innerHTML);
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
                    if (counter.length==1)
                    {
                        elems[j].innerHTML = '0'+counter;
                    }   
                    else if (counter.length==2)
                    {
                        elems[j].innerHTML = counter;
                    }
                }
                
            }
            if(i>max) clearInterval(anim);
            i+=1;
        },50);
}

setDisplay = function(className, val)
{
    var elems = document.getElementsByClassName(className);
    for(var i = 0; i < elems.length; i++) 
    {
        elems[i].style.display=val;
    }

}

expandHeading = function(target)
{
    if (prevHeading!=null)
    {
        prevHeading.style.borderBottom = 'none';

        if (prevHeading.innerHTML.trim()=="P U B L I C A T I O N S") 
        {
            setDisplay('publications','none');
        }
        else if (prevHeading.innerHTML.trim()=="P A T E N T") 
        {
            setDisplay('patents','none');
        }
        else if (prevHeading.innerHTML.trim()=="P R O J E C T S") 
        {
            setDisplay('projects','none');
        }
        else if (prevHeading.innerHTML.trim()=="A C C O L A D E S") 
        {
            setDisplay('awards','none');
        }
        else if (prevHeading.innerHTML.trim()=="C E R T I F I C A T I O N S") 
        {
            setDisplay('certifications','none');
        }
    }

    if (target!=null)
    {
    
        target.style.borderBottom = '1px solid #28292B';

        if (target.innerHTML.trim()=="P U B L I C A T I O N S") 
        {
            window.location = "#publications-heading-row";
            setDisplay('publications','flex');
        }
        else if (target.innerHTML.trim()=="P A T E N T") 
        {
            window.location = "#patents-heading-row";
            setDisplay('patents','flex');
        }
        else if (target.innerHTML.trim()=="P R O J E C T S") 
        {
            window.location = "#projects-heading-row";
            setDisplay('projects','flex');
        }
        else if (target.innerHTML.trim()=="A C C O L A D E S") 
        {
            window.location = "#awards-heading-row";
            setDisplay('awards','flex');
        }
        else if (target.innerHTML.trim()=="C E R T I F I C A T I O N S") 
        {
            window.location = "#certifications-heading-row";
            setDisplay('certifications','flex');
        }
        prevHeading = target;
    }
}

displayPublications = function()
{
    var ip = location.host;

    $.getJSON("http://"+ip+"/data.json", function(data){
        pubs = data.publications;
        for (var key in pubs) 
        {
            publication = pubs[key];
            elem = "<div class='row publications' style='justify-content: center; margin-top: 2vw;' >\
                <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                    <img src='icons/icons-square3.010.png' class='small-logo'>\
                </div>\
                <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                    <span class='publication-name' onclick='expandInfo(this)'>"
                        +publication["title"]+
                    "</span>\
                    <span class='publisher'> "+publication["publisher"]+" </span>\
                    <div class='publication-info-badges-container '>\
                        <span class='publication-date'>"+publication["date"]+"</span>\
                        <a class='view-btn' target='_blank' href='"+publication["link"]+"'> VIEW </a>\
                    </div>\
                    <span class='accomplishment-info'> \
                    "+publication["description"]+"\
                    </span>\
                </div>\
            </div>";

            $("#publications-heading-row").after(elem);
        }
    });
}

displayPatents = function()
{
    var ip = location.host;

    $.getJSON("http://"+ip+"/data.json", function(data){
        patents = data.patents;
        for (var key in patents) 
        {
            patent = patents[key];
            elem = 
                "<div class='row patents' style='justify-content: center; margin-top: 2vw;' >\
                    <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                        <img src='icons/icons-square3.011.png' class='small-logo'>\
                    </div>\
                    <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                        <span class='publication-name' onclick='expandInfo(this)'>  \
                            "+patent['title']+"\
                        </span>\
                        <span class='publisher'> "+patent['ref-and-status']+" </span>\
                        <div class='publication-info-badges-container '>\
                            <span class='publication-date'>"+patent['date']+"</span>\
                            <a class='view-btn' target='_blank' href='"+patent['link']+"'> VIEW </a>\
                        </div>\
                        <span class='accomplishment-info'> \
                            "+patent['description']+" \
                        </span>\
                    </div>\
                </div>";

            $("#patents-heading-row").after(elem);
        }
    });
}

displayProjects = function()
{
    var ip = location.host;

    $.getJSON("http://"+ip+"/data.json", function(data){
        projects = data.projects;
        for (var key in projects) 
        {
            project = projects[key];

            if (project['link-to-demo']=="#")
            {
                elem = 
                "<div class='row projects' style='justify-content: center; margin-top: 2vw;'>\
                    <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                        <img src='icons/icons-square2.012.png' class='small-logo'>\
                    </div>\
                    <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                        <span class='publication-name' onclick='expandInfo(this)'>  \
                            "+project['title']+"\
                        </span>\
                        <span class='publisher'> "+project['project-scale']+" </span>\
                        <div class='publication-info-badges-container '>\
                            <span class='publication-date'>"+project['date']+"</span>\
                            <a class='view-btn' target='_blank' href='"+project['link-to-code']+"' > VIEW </a>\
                        </div>\
                        <span class='accomplishment-info'> \
                        "+project['description']+"\
                        </span>\
                    </div>\
                </div>"; 
            }
            else
            {
                elem = 
                "<div class='row projects' style='justify-content: center; margin-top: 2vw;'>\
                    <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                        <img src='icons/icons-square2.012.png' class='small-logo'>\
                    </div>\
                    <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                        <span class='publication-name' onclick='expandInfo(this)'>  \
                            "+project['title']+"\
                        </span>\
                        <span class='publisher'> "+project['project-scale']+" </span>\
                        <div class='publication-info-badges-container '>\
                            <span class='publication-date'>"+project['date']+"</span>\
                            <a class='view-btn' target='_blank' href='"+project['link-to-code']+"' > VIEW </a>\
                            <a class='view-btn' target='_blank' href='"+project['link-to-demo']+"' > DEMO </a>\
                        </div>\
                        <span class='accomplishment-info'> \
                        "+project['description']+"\
                        </span>\
                    </div>\
                </div>"; 
            }
            
            $("#projects-heading-row").after(elem);
        }
    });

}

displayAwards = function()
{
    var ip = location.host;

    $.getJSON("http://"+ip+"/data.json", function(data){
        awards = data.awards;
        for (var key in awards) 
        {
            award = awards[key];
            elem = 
                "<div class='row awards' style='justify-content: center; margin-top: 2vw;'>\
                    <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                        <img src='icons/icons-square2.012.png' class='small-logo'>\
                    </div>\
                    <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                        <span class='publication-name' onclick='expandInfo(this)'>  \
                            "+award['title']+"\
                        </span>\
                        <span class='publisher'> "+award['issuer']+" </span>\
                        <div class='publication-info-badges-container '>\
                            <span class='publication-date'>"+award['date']+"</span>\
                        </div>\
                        <span class='accomplishment-info'> \
                        "+award['description']+"\
                        </span>\
                    </div>\
                </div>"; 

            $("#awards-heading-row").after(elem);
        }
    });
}

displayCertifications = function()
{
    var ip = location.host;

    $.getJSON("http://"+ip+"/data.json", function(data){
        certifications = data.certifications;
        for (var key in certifications) 
        {
            certification = certifications[key];
            elem = 
                "<div class='row certifications' style='justify-content: center; margin-top: 2vw;'>\
                    <div class='small-logo-container col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>\
                        <img src='icons/icons-square2.013.png' class='small-logo'>\
                    </div>\
                    <div class='publication-info-container col-xs-32 col-sm-32 col-md-32 col-lg-32 col-xl-32 col-xxl-32' style='flex-direction: column; justify-content: center;'>\
                        <span class='publication-name' onclick='expandInfo(this)'>  \
                            "+certification['title']+"\
                        </span>\
                        <span class='publisher'> "+certification['issuer']+" </span>\
                        <div class='publication-info-badges-container '>\
                            <span class='publication-date'>"+certification['date']+"</span>\
                            <a class='view-btn' target='_blank' href='"+certification['link-to-verify']+"' > VIEW </a>\
                        </div>\
                    </div>\
                </div>"; 

            $("#certifications-heading-row").after(elem);
        }
    });
}

displayAll = function(callback)
{
    displayPublications();
    displayPatents();
    displayProjects();
    displayAwards();
    displayCertifications();
    setTimeout(function() {
        callback();
    }, 10);
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
    prevElem = null;
    prevHeading = null;
    
    displayAll(animateAccomplishmentNumbers)
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

   