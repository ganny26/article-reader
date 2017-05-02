var height = '150px';
var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('toolbar.html');
iframe.style.height = height;
iframe.style.width = '100%';
iframe.style.position = 'fixed';
iframe.style.top = '0';
iframe.style.left = '0';
iframe.style.zIndex = '938089';
iframe.style.backgroundColor = 'black';
document.documentElement.appendChild(iframe);
$('body').css({
    '-webkit-transform':'translateY(150px)'
})