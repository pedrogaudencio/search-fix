$('body').delegate("a", "click", function()
{
	var cUrl = $(location).attr('href');
	var lUrl = $(this).attr('data-href');

	if(lUrl == undefined){
		var path = $(this).attr('href');
		if(path.charAt(0) == '/') {
			lUrl = window.location.origin + path;
		} else {
			lUrl = path;
		}
	}

	chrome.runtime.sendMessage({method: "addTrack", currentUrl: cUrl, linkUrl: lUrl});
});
