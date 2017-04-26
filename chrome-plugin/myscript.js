var url = chrome.extension.getURL('toolbar.html');
var height = "35px";
var iframe = "<iframe src='"+ url +"'id='frame1' style='height:"+height+"'></iframe>";
$('body').append(iframe);
$('body').css({
    '-webkit-transform': 'translateY('+ height +')'
})
