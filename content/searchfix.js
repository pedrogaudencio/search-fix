var searchid = $("#gbqfq");
var fetchIt;

$(document).ready(function(){
	console.log('Ready called.');
	setTimeout(sendInput, 600);
});

$('body').delegate("a", "click", function() {
	var input = $("#gbqfq").val();
	var cUrl = $(location).attr('href');

	chrome.runtime.sendMessage({method: "addSearch", url: cUrl, search: input});
});

searchid.blur(function() {
	setTimeout(sendInput, 600);
});

function getInput(){
	return searchid.val();
}

function sendInput() {
	var input = searchid.val();

	console.log(input);

	chrome.runtime.sendMessage({method: "getSearch", search: input}, function(result){
		console.log(result);
		removeHTMLfromPage();
		if (result != null) {
			addHTMLtoPage(result);
		} else {
			console.log('OK, now we try the approcimate stuff...');
			chrome.runtime.sendMessage({method: "getApproximateSearch", search: input}, function(result){
				console.log(result);
				if (result != null) {
					addApproximateResultToPage(result);
				}
			});
		}
	});
}

searchid.keyup(sendInput);

/*
searchid.keyup(function() {
	clearInterval(fetchIt);
	fetchIt = setTimeout(sendInput, 1000);
});
*/

//sendInput();
