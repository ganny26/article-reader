// Copyright (c) 2017 selvaganeshrajam@gmail.com . All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var tabUrl = window.location.href;
console.log(tabUrl);
var x = document.getElementById('read');
x.innerText;
$.ajax({
    url: tabUrl,
    type: "get",
    dataType: "html",
    success: function(data) {
        iframeContent = data;
        var ingredata = $(data).find('.ingredientstitle').next().text();
        ingredents = ingredata;
        console.log(ingredata);
    },
    error: function(data) {
        console.log('Error while fetching data');
    }
})


$('#readContent').click(function() {
    console.log('Read content clicked');
})