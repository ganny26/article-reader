'use strict'
var web_contents = [{
    "id": "1",
    "page_url": "https://www.archanaskitchen.com/mangalorean-style-bella-metthe-dosa-recipe-jaggery-fenugreek-seed-pancakes-recipe"
}, {
    "id": "2",
    "page_url": "https://www.archanaskitchen.com/kerala-chicken-curry-recipe"
}, {
    "id": "3",
    "page_url": "https://www.archanaskitchen.com/maa-inji-recipe-mango-ginger-pickle"
}, {
    "id": "4",
    "page_url": "https://www.archanaskitchen.com/khatta-meetha-pahari-kaddu-recipe"
}, {
    "id": "5",
    "page_url": "https://www.archanaskitchen.com/no-bake-white-chocolate-cheesecake-recipe"
}, {
    "id": "6",
    "page_url": "https://www.archanaskitchen.com/mangalorean-style-bella-metthe-dosa-recipe-jaggery-fenugreek-seed-pancakes-recipe"
}];

let iframeContent = null;
let ingredents = null;
function randomUrl() {
    var ran_key = Math.floor(Math.random() * web_contents.length);
    var ran_content = web_contents[ran_key];
    console.log(ran_content.page_url);
    console.log(ran_content.id);
    return ran_content.page_url;
}

$(document).ready(function () {
    console.log('loaded');
    //tool tip initialization
    $('[data-toggle="tooltip"]').tooltip();
    var page_src = randomUrl();
    $('#redirect').attr('href', page_src);
    loadUrlToFrame(page_src);
});


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
            $('#stumble-frame').attr('src', page_src);
        },
        error: function (data) {
            console.log('Error while fetching data');
        }
    })
}

function respondToSizingMessage(e) {
   
        if (e.origin == 'http://localhost:8011') { // e.data is the string sent by the origin with postMessage. 
            if (e.data == 'sizing?') {
                e.source.postMessage('sizing:' + document.body.scrollHeight + ',' + document.body.scrollWidth, e.origin);
            }
        }
     // we have to listen for 'message' window.addEventListener('message', respondToSizingMessage, false); 
}

function handleSizingResponse(e) {
    if (e.origin == 'http://www.archanaskitchen.com') {
        var action = e.data.split(':')[0]
        if (action == 'sizing')
        { resizeCanvas(e.data.split(':')[1]); }
        else
        { console.log("Unknown message: " + e.data); }
    }
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
    speak(ingredents.replace(/\s/g, ''));
})

function getVoices() {
    var voices = speechSynthesis.getVoices();
    return voices[3];
}

function speak(text) {
    console.log('speaking');
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;

    // Set the attributes.
    msg.volume = parseFloat(1);
    msg.rate = parseFloat(1);
    msg.pitch = parseFloat(1);


    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.

    msg.voice = getVoices();


    // Queue this utterance.
    window.speechSynthesis.speak(msg);
}
