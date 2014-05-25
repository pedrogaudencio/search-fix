var storedSearches = {}

var linksDict = {};
var searchDict = {};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "addTrack"){
		console.log("currentUrl: " + request.currentUrl + "\nlinkUrl: " + request.linkUrl);

		var newVal = linksDict[request.currentUrl];

		if(newVal == undefined)
			newVal = request.currentUrl;

		linksDict[request.linkUrl] = newVal;

		delete linksDict[request.currentUrl];

		var printit = JSON.stringify([linksDict], null, '\t');
		console.log(printit);

	} else if (request.method == "addSearch"){
		searchDict[request.url] = request.search;

		console.log(searchDict);
	} else if (request.method == "getSearch"){
		sendResponse(storedSearches[request.search]);
	} else if (request.method == "getApproximateSearch"){
		sendResponse(getApproximateSearch(request.search));
	} else if (request.method == "storeSearch") {
		store(request.url, request.title, request.scrollPosition);
	} else if (request.method == "getStoredSearches") {
		sendResponse(storedSearches);
	}
});

function hashString(str){
	var result = 0;
	for (var i = 0; i < str.length; i++) {
		result += str.charCodeAt(i);
	}
	return result;
}

function getApproximateSearch(currentSearch){

	console.log('1');

	searches = Object.keys(storedSearches);

	var hashCurrentSearch = hashString(currentSearch);

	var hashes = {};
	var hashList = [];

	for (var i = 0; i < searches.length; i++) {
		var tmpHash = hashString(searches[i]);
		hashList.push(tmpHash);
		hashes[tmpHash] = searches[i]; 
	}

	var minValue = Infinity;
	var minHash = 0;

	for (var i = 0; i < hashList.length; i++) {
		var tmp = Math.abs(hashList[i] - hashCurrentSearch);
		if (tmp < minValue) {
			minValue = tmp;
			minHash = hashList[i];
		}
	}	

	//return {search: hashes[minHash], approximateSearch: storedSearches[hashes[minHash]]};

	console.log('MinHash:');
	console.log(hashes[minHash]);

	console.log(currentSearch);

	var bestSearchParts = hashes[minHash].split(" ");
	var searchParts = currentSearch.split(" ");

	var partsCount = 0;

	for (var i = 0; i < searchParts.length; i++) {
		if (bestSearchParts.indexOf(searchParts[i]) != -1){
			partsCount += 1;
		}
	}

	console.log(partsCount);

	var blah = bestSearchParts.length / 2;
	console.log(blah);

	if (partsCount >= bestSearchParts.length / 2) {
		console.log('IF ENTERED');
		return {search: hashes[minHash], approximateSearch: storedSearches[hashes[minHash]]}
	} else {
		return null;
	}

	/*
	console.log(hashList);

	for (var i = 0; i < searches.length; i++) {
		var hashExistingSearch = hashString(searches[i]);
		for (var j = 0; j < searchParts.length; j++) {
			if (existingSearchesParts.indexOf(searchParts[j]) != -1){
				return {search: searches[i], approximateSearch: storedSearches[searches[i]]};
			}
		}
	}

	return null;
	*/
}

function load() {
	chrome.storage.local.get("storedSearches", function(result){
		storedSearches = result.storedSearches;
		if(storedSearches == undefined)
			storedSearches = {};
			console.log(storedSearches);
	});
}

function store(resultUrl, resultTitle, scrollPosition) {
	console.log(resultUrl);
	console.log(linksDict[resultUrl]);
	console.log(searchDict);

	var search = searchDict[linksDict[resultUrl]];

	console.log(search);

	storedSearches[search] = {url: resultUrl, title: resultTitle, position: scrollPosition};

	chrome.storage.local.set({"storedSearches": storedSearches});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {method: "displayToast", query: search});
	});
}

load();
