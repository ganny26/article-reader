var deviceInfo = {
    "appname": navigator.appName,
    "appversion":navigator.appVersion,
    "cookie":navigator.cookieEnabled,
    "platform":navigator.platform,
    "useragent":navigator.userAgent
}

console.log(deviceInfo);

SocialShareKit.init();

shareLink = "whatsapp://send?text="+window.location.href;
$('.ssk-whatsapp').attr('href',shareLink);


/** handling open in app for android devices alone**/

if(deviceInfo.useragent.includes('Android')){
	$('#open-app').show();
}else{
	$('#open-app').hide();
}