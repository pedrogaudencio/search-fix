var searchid = $("#gbqfq");
var fetchIt;


$(document).ready(function(){
	console.log('Ready called.');
	setTimeout(sendInput, 600);
});

/*
 * Add listener to every link in the page
 */
$('body').delegate("a", "click", function() {
	var input = $("#gbqfq").val();
	var cUrl = $(location).attr('href');

	chrome.runtime.sendMessage({method: "addSearch", url: cUrl, search: input});
});

/*
 * Wait 0.600s till the search box loses focus to trigger the message sending.
 */
searchid.blur(function() {
	setTimeout(sendInput, 600);
});

/*
 * Retrieve search query from the search input field.
 */
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
			removeSquare();
			addHTMLtoPage(result);
		} else {
			console.log('OK, now we try the approcimate stuff...');
			chrome.runtime.sendMessage({method: "getApproximateSearch", search: input}, function(result){
				console.log(result);
				if (result != null) {
					removeSquare();
					addApproximateResultToPage(result);
				}
			});
		}
	});
}

/*
 * Reserve white space before right search results.
 */
function reserveSquare() {
	var html = '<div id="reserveSquare" style="margin-bottom: 150px;"></div>';
	$("#rhs_block").prepend(html);
}

/*
 * Remove white square to be replaced with search results.
 */
function removeSquare() {
	$('#reserveSquare').remove();
}

reserveSquare();
searchid.keyup(sendInput);

/*
searchid.keyup(function() {
	clearInterval(fetchIt);
	fetchIt = setTimeout(sendInput, 1000);
});
*/

//sendInput();
