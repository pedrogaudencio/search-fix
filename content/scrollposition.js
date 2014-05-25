chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "getScrollPosition"){
		sendResponse(window.scrollY);
	}
});