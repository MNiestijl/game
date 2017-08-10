var HttpService = {};

HttpService.request = function(url, method, headers, patchData) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open(method, url);
		headers.forEach(header => request.setRequestHeader(header.header, header.value));

		request.onload = function (event) {
			var status = event.target.status;
			var response = event.target.response;
			if (status >= 200 && status < 300) {
				var contentType = event.target.getResponseHeader("Content-Type");
				var data = contentType && contentType.startsWith("application/json") ?
					JSON.parse(response) : response;
				resolve({
					status: status,
					data: status === 204 ? [] : data
				});
				return;
			}
			reject({
				HTTPRequestError : status + ": " + (event.target.statusText || "An error has occurred.")
			});
		};


		request.onerror = function() {
			reject("No connection.");
		};

		request.send(patchData);
	});
};

HttpService.test = function(method, patchData) {
	const url = "HTTP://127.0.0.1:8082/json";
	const headers = [
		{ header: "Content-Type", value: "application/json" }
	];
	return HttpService.request(url, method, headers, patchData)
	.catch(error => console.log(error.HTTPRequestError))
	.catch(error => alert(error));
};


