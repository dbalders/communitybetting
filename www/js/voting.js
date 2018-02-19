function vote() {
	$('.vote').click(function() {
		
		var sendData = {
			'betId': $(this).attr('data-id'),
			'betVote': $(this).attr('data-vote-title')
		}

		console.log(sendData)

		$.ajax({
			url: 'http://localhost:3000/api/vote', //Your api url
			type: 'PUT', //type is any HTTP method
			data: {
				data: sendData
			}, //Data as js object
			success: function(data) {
				var update = true;
				console.log(data)  //Here we need to update the data on the page
				getData(update);
			}
		});
	})

}