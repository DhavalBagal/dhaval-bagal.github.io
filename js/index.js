
function typeWriter() {
    var speed = 50;

    setTimeout(function(){

        var i=1;
        txt1 = "Dhaval";
        $("#dhaval-logo-text").text('D');
        $("#dhaval-logo-text").css('display','flex');
        
        anim = setInterval(function(){

            $("#dhaval-logo-text").text($("#dhaval-logo-text").text()+" "+txt1.charAt(i))
            i+=1;
            if(i==6) clearInterval(anim);

        },100);
    },1000);

    setTimeout(function(){

        var j=1;
        txt2 = "Bagal"

        $("#bagal-logo-text").text('B');
        $("#bagal-logo-text").css('display','flex');
        anim = setInterval(function(){

            $("#bagal-logo-text").text($("#bagal-logo-text").text()+" "+txt2.charAt(j))
            j+=1;
            if(j==5) clearInterval(anim);

        },100);

    },1600);

    setTimeout(function(){
        $("#dhaval-logo-text").text('D h a v a');
        $("#bagal-logo-text").text('B a g a l')
        $(".button").css('display','flex');
    },2500);
    
}

window.onload = function()
{
    typeWriter();
}


function home()
{
    $(".logo-img").css("animation-name", "logo-anim");
    $(".logo-img").css("animation-duration", "1s");
    $(".logo-img").css("animation-fill-mode", "forwards");

    $(".logo-text").css("animation-name", "logo-anim");
    $(".logo-text").css("animation-duration", "1s");
    $(".logo-text").css("animation-fill-mode", "forwards");

    $(".button").css("animation-name", "proceed-anim");
    $(".button").css("animation-duration", "1s");
    $(".button").css("animation-fill-mode", "forwards");
    setTimeout(function(){
        //window.location.replace("home.html");
        window.location.href = "home.html";
    },1000);
    
}
