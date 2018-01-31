function vote() {
	$('span').click(function() {
		
		var sendData = {
			'betId': $(this).attr('data-id'),
			'betVote': $(this).attr('data-vote')
		}

		$.ajax({
			url: 'http://localhost:3000/api/vote', //Your api url
			type: 'PUT', //type is any HTTP method
			data: {
				data: sendData
			}, //Data as js object
			success: function(data) {
				console.log(data)
			}
		});
	})

}