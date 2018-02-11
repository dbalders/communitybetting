// $.ajax({
//   dataType: "json",
//   url: "localhost:3000/api/bets/",
//   data: data,
//   success: success
// });

$.getJSON("http://localhost:3000/api/bets/", function(data) {
	var bets = [];
	data = data.data
	var firstTime = true;
	$.each(data, function(key, bet) {
		for (var i = 0; i < Object.keys(bet).length; i++) {
			// console.log(Object.keys(bet)[i])
			// console.log(Object.values(bet)[i])
			if (Object.values(bet) === undefined) {
				Object.values(bet) = "";
			}
		}
		buildBets(bet, firstTime);
		// console.log(bet);
		firstTime = false
	});
	vote();
});

function buildBets(bet, firstTime) {
	!firstTime ? $('.bet-container').first().clone(true).appendTo(".bet-list-container") : '';
	var betHTML = $('.bet-container')[$('.bet-container').length - 1];

	//start filling in the html attributes
	$(betHTML).find('.bet-title a').text(bet.gameTitle).attr('href', '"https://sports.bovada.lv"' + bet.link + '"')

	//away team
	$(betHTML).find('[data-title=awayTeamAbbr]').text(bet.awayTeamAbbr).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamSpreadVotes]').text(bet.awayTeamSpread).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamMLVotes]').text(bet.awayTeamML).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betMLUnderVotes]').text(bet.betMLUnderValue).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOU]').text(bet.betOU).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUUnderValue]').text(bet.betOUUnderValue).attr('data-id', bet._id);

	//home team
	$(betHTML).find('[data-title=homeTeamAbbr]').text(bet.homeTeamAbbr).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamSpreadVotes]').text(bet.homeTeamSpread).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamMLVotes]').text(bet.homeTeamML).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betMLOverVotes]').text(bet.betMLOverValue).attr('data-id', bet._id);
	// $(betHTML).find('[data-title=betOU]').text(bet.betOU).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUOverValue]').text(bet.betOUUnderValue).attr('data-id', bet._id);
	console.log($(betHTML).find('[data-title=awayTeamAbbr]').html())
	// $('body').append("<p><a href='https://sports.bovada.lv" + bet.link + "'>" + bet.gameTitle + "</a></p>");
	// $('body').append("<p><span>" + bet.awayTeamAbbr + "</span> <span data-vote='awayTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.awayTeamSpread + "</span> <span>" + bet.awayTeamSpreadValue + "</span> <span data-vote='awayTeamMLVotes' data-id='" + bet._id + "'>" + bet.awayTeamML + "</span> <span data-vote='betMLUnderVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLUnderValue + "</span></p>");
	// $('body').append("<p><span>" + bet.homeTeamAbbr + "</span> <span data-vote='homeTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.homeTeamSpread + "</span> <span>" + bet.homeTeamSpreadValue + "</span> <span data-vote='homeTeamMLVotes' data-id='" + bet._id + "'>" + bet.homeTeamML + "</span> <span data-vote='betMLOverVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLOverValue + "</span></p>");
}

// console.log(data)