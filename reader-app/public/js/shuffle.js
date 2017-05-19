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

let iframeContent = null;
let ingredents = null;
var uttranceArticle = new SpeechSynthesisUtterance();
var synth = window.speechSynthesis;
function randomUrl() {
    var ran_key = Math.floor(Math.random() * web_contents.length);
    var ran_content = web_contents[ran_key];
    console.log(ran_content.page_url);
    console.log(ran_content.id);
    return ran_content.page_url;
}

$(document).ready(function () {
    
    console.log('loaded');
    //hide player
  
    //tool tip initialization
    $('[data-toggle="tooltip"]').tooltip();
    var page_src = randomUrl();
    $('#redirect').attr('href', page_src);
    loadUrlToFrame(page_src);
});

function speechPause(){
    console.log('Paused');
    synth.pause();
};

function speechStop(){
    console.log('Stopped');
    synth.cancel();
};

function speechResume(){
    console.log('Resume');
    synth.resume();
}

function loadUrlToFrame(page_src) {
    $.ajax({
        url: page_src,
        type: "get",
        dataType: "html",
        success: function (data) {
            iframeContent = data;
            var ingredata = $(data).find('.ingredientstitle').next().text();
            ingredents = ingredata;
            console.log(ingredata);
            /*loaded from html
            var iframe = document.getElementById('stumble-frame');
            var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
            iframedoc.body.innerHTML = data;*/
              $('.read-icon').hide();
            $('#stumble-frame').attr('src', page_src);
        },
        error: function (data) {
            console.log('Error while fetching data');
        }
    })
}



//on frame load
$('#stumble-frame').load(function () {
  //  $('#stumble-frame').hide();
    console.log('iframe loaded successfully');
    var iframe = document.getElementById('stumble-frame'); 
    iframe.contentWindow.postMessage('sizing?', 'http://www.archanaskitchen.com'); 
    
   window.addEventListener('message', handleSizingResponse, false);
});

$('#load_home').click(function () {
    var page_src = randomUrl();
    loadUrlToFrame(page_src);
});

//Ingredients scroll
$('#navIng').click(function () {
    $('.ingredientstitle').animate({
        scrollTop: $("#navIng").offset().top
    }, 2000);
});

//ingredients to scroll
$('#navIng').click(function (e) {
    console.log('clicked')
    e.preventDefault();
    speak(ingredents.replace(/\s/g, ''));
    $('#stumble-frame').scrollTop(438);
   // $("#stumble-frame").contents().scrollTop($("#stumble-frame").contents().scrollTop() + 1000);
});

//velocity js
function scrollByClass(x) {
    $(x).velocity('scroll', {
        duration: 1500,
        offset: -400,
        easing: 'ease-in-out'
    });
}

$('#readContent').click(function (e) {
    e.preventDefault();
    speechResume();
    //speak(ingredents.replace(/\s/g, ''));
})

$('#pauseContent').click(function (e) {
    e.preventDefault();
   speechPause();
    //speak(ingredents.replace(/\s/g, ''));
})

$('#stopContent').click(function(e){
      e.preventDefault();
speechStop();
})

function getVoices() {
    var voices = speechSynthesis.getVoices();
    return voices[3];
}

$(document).on('pageload',function(e){
      $('.read-icon').hide();
})

function setSpeechConfiguration(){
     // Set the attributes.
    uttranceArticle.volume = parseFloat(1);
    uttranceArticle.rate = parseFloat(3);
    uttranceArticle.pitch = parseFloat(1);
}

function speak(text) {
    console.log('speaking');
    setSpeechConfiguration();
    uttranceArticle.text = text;
    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.

    uttranceArticle.voice = getVoices();

    // Queue this utterance.
    synth.speak(uttranceArticle);
}
