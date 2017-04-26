// Copyright (c) 2017 selvaganeshrajam@gmail.com . All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerHTML);
function getVoices() {
    var voices = speechSynthesis.getVoices();
    return voices[3];
}

 $.ajax({
        url: "https://developer.chrome.com/extensions/browserAction",
        type: "get",
        dataType: "html",
        success: function (data) {
        	console.log(data);
        },
        error: function (data) {
            console.log('Error while fetching data');
        }
    })


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
