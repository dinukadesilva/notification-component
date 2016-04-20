import xhr from './xhr';

module.exports = function CoachmarkApi(config) {
	let url = config.cmApiUrl;
	let xAuth = config.cmPiToken;
	let acceptHeader = config.cmAcceptHeader;
	let contentType = config.cmContentTypeHeader;

	/**
	 * Gets a coachmark by id
	 **/
	this.getCoachmark = function(cmId) {
		let response = new Promise(function(resolve, reject) {
			xhr({
				url: url + '/coachmark/' + cmId,
				headers: {
					'X-Authorization': xAuth,
					'Accept': acceptHeader,
					'Content-Type': contentType
				},
				onSuccess: function(request) {
					resolve(parseResponse(request.responseText, cmId));
				},
				onError: function(request) {
					console.log('onError: ', request);
					reject(request.responseText || new Error('Network Error: ', request));
				}
			});
		});
		return response;
	};

	/**
	 * Tracks how many times a coachmark has been viewed
	 **/
	this.incrementViewCount = function(cmId) {
		let response = new Promise(function(resolve, reject) {
			xhr({
				method: 'PUT',
				url: url + '/coachmark/' + cmId+'/increment',
				headers: {
					'X-Authorization': xAuth,
					'Accept': acceptHeader,
					'Content-Type': contentType
				},
				onSuccess: function(request) {
					resolve(request.responseText);
				},
				onError: function(request) {
					console.log('onError: ', request);
					reject(request.responseText || new Error('Network Error: ', request));
				}
			});
		});
		return response;
	};

	/**
	 * Helper function
	 **/
	function parseResponse(response, cmId) {
		let coachmark = JSON.parse(response);

		if (!coachmark.options.id) {
			coachmark.options.id = cmId;
		}
		return coachmark;
	}
};
