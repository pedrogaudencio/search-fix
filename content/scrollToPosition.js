$('body').delegate("#searchresult", "click", function(){
	chrome.runtime.sendMessage({method: "setScrollPosition", scrollPosition: $(this).attr('scrollPosition')});
});


$(document).ready(function(){
	chrome.runtime.sendMessage({method: "getScrollPosition"}, function(response) {
		console.log(response);
		if(response != 0) {
			window.scrollTo(0, response);
			chrome.runtime.sendMessage({method: "resetScrollPosition"});
		}
	});
})