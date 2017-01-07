
window.onload = function() {

	sendJsonRequest();

	// invoked send method every 1 seconds
    setInterval(sendJsonRequest, 1000);
}

// This is AJAX. This method sends a JSON request to
// an API that is hosted in the server-side
// application.
function sendJsonRequest() {
    httpRequest = new XMLHttpRequest();
    //The base URL (http://localhost:8080) is not required.
    var url = "/apis/json";
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = function () { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var jsonResponse = JSON.parse(httpRequest.responseText);
            // Append the JSON response to an element
            // in the HTML document
            var element = document.getElementById("playground");
            element.innerHTML = element.innerHTML + "<br/>" + "jsonResponse: " + JSON.stringify(jsonResponse);
        }
    }
    httpRequest.send();
}