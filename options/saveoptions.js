var storedSearches = {};

function buildFields(){
  chrome.runtime.sendMessage({method: "getStoredSearches"}, function(storedSearches){
    var fields = "";

    if(Object.keys(storedSearches) != ''){
      fields = '<form role="form">';
      for(var key in storedSearches){
        fields += 
'<div class="form-group col-xs-6"> \
    <input class="form-control" id="' + key + '-key" value="' + key + '"> \
</div> \
<div class="form-group col-xs-6"> \
    <input class="form-control" id="' + key + '-value" value="' + storedSearches[key].url + '"> \
</div>';
      }
      fields += '<button type="submit" class="btn btn-default">Save</button> \
      </form>'
    } else {
      fields += '<p>The search dictionary is empty.</p>';
    }
    $("#db").html(fields);
  });
}

buildFields();

// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }

// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//     save_options);