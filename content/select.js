$("body").bind('copy', function (event) {
  var cUrl = $(location).attr('href');
  //alert($('title').text());
  chrome.runtime.sendMessage({method: "storeSearch", url: cUrl, title: $('title').text(), scrollPosition: window.scrollY});
});