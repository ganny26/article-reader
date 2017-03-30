'use strict'
var web_contents = [{
    "id": "1",
    "page_url": "http://www.archanaskitchen.com/mangalorean-style-bella-metthe-dosa-recipe-jaggery-fenugreek-seed-pancakes-recipe"
}, {
    "id": "2",
    "page_url": "http://www.archanaskitchen.com/kerala-chicken-curry-recipe"
}, {
    "id": "3",
    "page_url": "http://www.archanaskitchen.com/maa-inji-recipe-mango-ginger-pickle"
}, {
    "id": "4",
    "page_url": "http://www.archanaskitchen.com/khatta-meetha-pahari-kaddu-recipe"
}, {
    "id": "5",
    "page_url": "http://www.archanaskitchen.com/no-bake-white-chocolate-cheesecake-recipe"
}, {
    "id": "6",
    "page_url": "http://www.archanaskitchen.com/mangalorean-style-bella-metthe-dosa-recipe-jaggery-fenugreek-seed-pancakes-recipe"
}];

function randomUrl() {
    var ran_key = Math.floor(Math.random() * web_contents.length);
    var ran_content = web_contents[ran_key];
    console.log(ran_content.page_url);
    console.log(ran_content.id);
    return ran_content.page_url;
}
$(document).ready(function() {
    console.log('loaded');
    var page_src = randomUrl();
    $('#stumble-frame').attr('src', page_src);
//    var stumbleFrame = $('#stumble-frame');

// 	var script   = document.createElement("script");
// 		script.type  = "text/javascript";
// 		script.text   = "var x = document.getElementsByClassName('.ingredientstitle');console.log('x data',x);"; 
// $('#stumble-frame').append(script);
   // $('#stumble-frame').attr('srcdoc', "<html><body><script>console.log('im from iframe');</script></body></html>");
   
});

$('#stumble-frame').load(function(){
	console.log('page loaded...');

        // var iFrameHead = window.frames["stumble-frame"].document.getElementsByTagName("head")[0];         
        // var myscript = document.createElement('script');
        // myscript.type = 'text/javascript';
        // myscript.src = "var x = document.getElementsByClassName('.ingredientstitle');console.log('x data',x)"; 
        // iFrameHead.appendChild(myscript);

 });

$('#load_home').click(function() {
    var page_src = randomUrl();
    $('#stumble-frame').attr('src', page_src);
   
});

//Ingredients scroll

$('#navIng').click(function() {
    $('.ingredientstitle').animate({
        scrollTop: $("#navIng").offset().top
    }, 2000);
});

//ingredients to scroll
$('#navIng').click(function(e) {
	console.log('clicked')
    e.preventDefault();
    scrollByClass('.ingredientstitle');
});

//velocity js
function scrollByClass(x) {
    $(x).velocity('scroll', {
        duration: 1500,
        offset: -400,
        easing: 'ease-in-out'
    });
}


  // window.addEventListener( "message",
  //         function (e) {
  //         	console.log('message')
  //               if(e.origin !== "http://www.archanaskitchen.com/no-bake-white-chocolate-cheesecake-recipe"){ 
  //               	console.log('EE',e);
  //               	console.log('Dataaa',e.data);
  //               	return; 
  //               } 
                
  //         },
  //         false);


// iframe = $('<iframe>');

// var script   = document.createElement("script");
// script.type  = "text/javascript";
// script.text  = "var x = document.getElementsByClassName('.ingredientstitle');console.log('x data',x)";

// iframe[0].appendChild(script);
// iframe.appendTo('#stumble-frame');