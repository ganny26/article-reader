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
let methods = null;
// var uttranceArticle = new SpeechSynthesisUtterance();
// var synth = window.speechSynthesis;
var articleUrl = null;
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
    $('.read-icon').hide();
    //tool tip initialization
    $('[data-toggle="tooltip"]').tooltip();
    articleUrl = getParameterByName('articleurl');
    console.log('Article url', articleUrl);
    var page_src = articleUrl;
    $('#redirect').attr('href', page_src);
    loadUrlToFrame(page_src);
});

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function speechPause() {
    console.log('Paused');
    speechSynthesis.pause();
};

function speechStop() {
    console.log('Stopped');
    speechSynthesis.cancel();
};

function speechResume() {
    console.log('Resume');
    speechSynthesis.resume();
}

function loadUrlToFrame(page_src) {
    $.ajax({
        url: page_src,
        type: "get",
        dataType: "html",
        success: function (data) {
            iframeContent = data;
            var ingredata = $(data).find('.ingredientstitle').next().text();
            var methoddata = $(data).find('.recipeinstructionstitle').next().text();
            ingredents = ingredata;
            methods = methoddata;
            console.log(ingredata);
            console.log(methoddata);
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



//on frame load
$('#stumble-frame').load(function () {
    //  $('#stumble-frame').hide();
    console.log('iframe loaded successfully');
    $('.loading-icon').hide();
});

$('#load_home').click(function () {
    $('.loading-icon').show();
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
    console.log('reading ingredients');
    e.preventDefault();
    //show player
    $('.read-icon').show();
    speak(ingredents.replace(/\s/g, ''));

});

//methods to scroll
$('#method').click(function (e) {
    console.log('reading methods');
    e.preventDefault();
    //show player
    $('.read-icon').show();
    speak(methods.replace(/\s/g, ''));

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
    var state = $(this).attr('data-mode');
    console.log(state);
    if (state === 'play') {
        $(this).find('i').removeClass();
        $(this).find('i').addClass('fa fa-play fa-2x');
        $(this).attr('data-mode', 'pause');
        speechPause();
    } else {
        $(this).find('i').removeClass();
        $(this).find('i').addClass('fa fa-pause fa-2x');
        $(this).attr('data-mode', 'play');
        speechResume();
    }


    //speak(ingredents.replace(/\s/g, ''));
})

$('#pauseContent').click(function (e) {
    e.preventDefault();
    speechPause();
    //speak(ingredents.replace(/\s/g, ''));
})

$('#stopContent').click(function (e) {
    e.preventDefault();
    $('.read-icon').hide();
    speechStop();
})

function getVoices() {
    var voices = speechSynthesis.getVoices();
    return voices[3];
}


function setSpeechConfiguration() {
    // Set the attributes.
    uttranceArticle.volume = parseFloat(1);
    uttranceArticle.rate = parseFloat(3);
    uttranceArticle.pitch = parseFloat(1);
}

function speak(text) {
    var uttranceArticle = new SpeechSynthesisUtterance();
    console.log('speaking');
    uttranceArticle.volume = parseFloat(1);
    uttranceArticle.rate = parseFloat(0.7);
    uttranceArticle.pitch = parseFloat(1)
    uttranceArticle.text = text;
    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.

    uttranceArticle.voice = getVoices();

    uttranceArticle.onend = function (e) {
        console.log('Finished in ' + e.elapsedTime + ' seconds.');
        speechSynthesis.cancel();
        $('#readContent').find('i').removeClass();
        $('#readContent').find('i').addClass('fa fa-play fa-2x');
        $('#readContent').attr('data-mode', 'play');

    };

    // Queue this utterance.
    speechSynthesis.speak(uttranceArticle);
}
