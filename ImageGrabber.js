function makeRequest(searchedTerm,resultIndex){
	this.APIKey = "AIzaSyC7bgXQ4XRndkzKXSQXwdQwiOIHmZvgfiQ";
	this.searchEngineID = "011766833210041731964:07xp0hl30ly";
	this.searchedTerm = searchedTerm;
	this.resultIndex = resultIndex;
	this.full = "https://www.googleapis.com/customsearch/v1?key="+this.APIKey+"&cx="+this.searchEngineID+"&q="+this.searchedTerm+"&filter=1&searchType=image&imgSize=xlarge&safe=medium&fields=items&start=";
}

var getJSON = function(url, successHandler, errorHandler) {
	var xhr = typeof XMLHttpRequest != 'undefined' 
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('get', url, true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function() {
		var status;
		var data;
		if (xhr.readyState == 4) {
			status = xhr.status;
			if (status == 200) {
				successHandler && successHandler(xhr.response);
			} else {
				errorHandler && errorHandler(status);
			}
		}
	};
	xhr.send();
};

window.onload = function(){ // STARTS HERE
	var searchBar = document.querySelector("#searchBar");
	var searchButton = document.querySelector("#searchButton");
	var body = document.querySelector("#body");
	var totalResults;
	var newImages = [];


	searchBar.onclick = function(){
		if(searchBar.value === "Search for..."){
			searchBar.value = "";
		}
	};


	searchButton.onclick = function(){
		var request = new makeRequest(searchBar.value,"1");
		getJSON((request.full+request.resultIndex), function(data) {
			totalResults = data.items;
			request.resultIndex = "11";
			getJSON((request.full+request.resultIndex), function(data) {
				totalResults = totalResults.concat(data.items);
				doneRetreiving();

			}, function(status) {
				console.log("Something went wrong");
			});

		}, function(status) {
			console.log("Something went wrong");
		});
	};

	doneRetreiving = function(){
		for(var i = 0; i < 20; i++){
			newImages.push(document.createElement('img'));
			newImages[i].src=totalResults[i].link;
		}
		// process images
		for(var i = 0; i < 20; i++){
			body.appendChild(newImages[i]);
		}
	};
};