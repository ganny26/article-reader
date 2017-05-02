var height = '80px';
var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('toolbar.html');
iframe.style.height = height;
iframe.style.width = '100%';
iframe.style.position = 'fixed';
iframe.style.top = '0';
iframe.style.left = '0';
iframe.style.zIndex = '938089';
iframe.style.backgroundColor = 'black';


var tabUrl = window.location.href;
var hostname = window.location.hostname;
console.log('Tab URL >>', tabUrl);
console.log('host name >>', hostname);

if (hostname === 'stackoverflow.com') {
    document.documentElement.appendChild(iframe);
    $('body').css({
        '-webkit-transform': 'translateY(80px)'
    })

} else {
    console.log('toolbar invisible')
}

var x = document.getElementById('read');
x.innerText;
// var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
// var regex = new RegExp(expression);
// var t = 'www.stackoverflow.com';

// if (t.match(regex)) {
//     alert("Successful match");
// } else {
//     alert("No match");
// }