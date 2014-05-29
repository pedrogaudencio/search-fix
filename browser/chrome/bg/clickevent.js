function getYoffset(tab){
	chrome.tabs.sendMessage(tab.id, {method: "getScrollPosition"}, function(scrollPosition){
		store(tab.url, tab.title, scrollPosition);
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	getYoffset(tab);
});