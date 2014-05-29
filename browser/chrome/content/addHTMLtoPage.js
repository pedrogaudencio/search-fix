function addHTMLtoPage(result) {
	console.log($("#searchresult"));
	// var js = 'var win = window.open('+result.url+'); alert("shit1"); win.ready(function(){ window.scrollTo(0, '+result.position+'); alert("shit");}); alert("shit2");';
	var onclick = '(function() {chrome.extension.sendMessage({method: "setScrollPosition", scrollPosition: ' + result.position + '}); console.log("shit");};)';
	var message = "Hey, you already searched for this one!";
	var style = "padding: 5px 10px; border:1px solid #fff; -webkit-box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55); -moz-box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55); box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55); list-style-type: none;";
	var html =
'<li id="searchresult" class="kp-blk _tc" style="' + style + '" scrollPosition="'+ result.position +'"> \
	<div class="rc _Cz" data-hveid="43"> \
		<p align="center">' + message + '</p><hr> \
			<a data-href="' + result.url + '" href="' + result.url + '" onclick="' + onclick +'"> \
				<h3 class="r">' + result.title + '</h3> \
			</a> \
	<div class="s"> \
		<div> \
			<div class="f kv _os" style="white-space:nowrap"> \
				<cite class="_Hd">' + result.url.substring(0, 80) + '</cite> \
			</div> \
			<div class="f slp"> \
			</div> \
			<span class="st">Click to go to the saved result!</span> \
			</div> \
		</div> \
	</div> \
</li>';
	$("#rhs_block").prepend(html);
	$("#searchresult").effect( "highlight", {color:"#e1efbb"}, 2000 );
}

function addApproximateResultToPage(approximateResult){

	var search = approximateResult.search;
	var result = approximateResult.approximateSearch;

	console.log($("#searchresult"));
	// var js = 'var win = window.open('+result.url+'); alert("shit1"); win.ready(function(){ window.scrollTo(0, '+result.position+'); alert("shit");}); alert("shit2");';
	var onclick = '(function() {chrome.extension.sendMessage({method: "setScrollPosition", scrollPosition: ' + result.position + '}); console.log("shit");};)';
	var message = "Hey, this search might be the one:";
	var style = "padding: 5px 10px; border:1px solid #fff; -webkit-box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55); -moz-box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55); box-shadow: 1px 1px 7px 0px rgba(50, 50, 50, 0.55);";
	var html =
'<li id="searchresult" class="kp-blk _tc" style="' + style + '" scrollPosition="'+ result.position +'"> \
	<div class="rc _Cz" data-hveid="43"> \
		<p align="center">' + message + '</p> \
		<p align="center"><em>' + search + '</em></p><hr> \
			<a data-href="' + result.url + '" href="' + result.url + '" onclick="' + onclick +'"> \
				<h3 class="r">' + result.title + '</h3> \
			</a> \
	<div class="s"> \
		<div> \
			<div class="f kv _os" style="white-space:nowrap"> \
				<cite class="_Hd">' + result.url.substring(0, 80) + '</cite> \
			</div> \
			<div class="f slp"> \
			</div> \
			<span class="st">Click to go to the saved result!</span> \
			</div> \
		</div> \
	</div> \
</li>';
	$("#rhs_block").prepend(html);
	$("#searchresult").effect( "highlight", {color:"#e1efbb"}, 2000 );
}


function removeHTMLfromPage() {
	$("#searchresult").remove();   
}