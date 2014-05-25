chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "displayToast"){
		var message = 'Stored for search:\n' + request.query;
		$().toastmessage('showSuccessToast', message);
	}
});