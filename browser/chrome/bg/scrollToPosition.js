var scrollPosition = 0;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "setScrollPosition"){
		console.log('setScrollPosition');
		scrollPosition = request.scrollPosition;
	} else if (request.method == "getScrollPosition"){
		console.log('getScrollPosition');
		sendResponse(scrollPosition);
	} else if (request.method == "resetScrollPosition"){
		scrollPosition = 0;
	}
});
