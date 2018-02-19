var bets = [];

function getData(update) {
	$.getJSON("http://localhost:3000/api/bets/", function(data) {
		bets = data.data
		var firstTime = true;
		$.each(bets, function(key, bet) {
			for (var i = 0; i < Object.keys(bet).length; i++) {
				if (Object.values(bet) === undefined) {
					Object.values(bet) = "";
				}
			}
			if (!update) {
				buildBets(bet, firstTime);
				firstTime = false
			} else {
				var betHTML = $('.bet-list-container')
				for (var y = 0; y < Object.keys(bet).length; y++) {
					// console.log(Object.keys(bet)[y])
					if( Object.keys(bet)[y].indexOf('Votes') >= 0){
						$(betHTML).find('[data-title=' + Object.keys(bet)[y] + '][data-id=' + bet._id + ']').text(Object.values(bet)[y]);
					}
					// $(betHTML).find('[data-title=' + Object.keys(bet)[y] + '][data-id=' + bet._id + ']').text(Object.values(bet)[y]);
				}
			}

		});
	});
}

function buildBets(bet, firstTime) {
	!firstTime ? $('.bet-container').first().clone(true).appendTo(".bet-list-container") : '';
	var betHTML = $('.bet-container')[$('.bet-container').length - 1];

	//start filling in the html attributes
	$(betHTML).find('.bets-container').attr('data-id', bet._id);
	$(betHTML).find('.bet-title a').text(bet.gameTitle).attr('href', '"https://sports.bovada.lv"' + bet.link + '"');

	//away team
	$(betHTML).find('[data-title=awayTeamAbbr]').text(bet.awayTeamAbbr).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamSpread]').text(bet.awayTeamSpread).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamSpreadVotes]').text(bet.awayTeamSpreadVotes).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamML]').text(bet.awayTeamML).attr('data-id', bet._id);
	$(betHTML).find('[data-title=awayTeamMLVotes]').text(bet.awayTeamMLVotes).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOU]').text(bet.betOU).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUUnder]').attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUUnderValue]').text("(" + bet.betOUUnderValue + ")").attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUUnderVotes]').text(bet.betOUUnderVotes).attr('data-id', bet._id);

	//home team
	$(betHTML).find('[data-title=homeTeamAbbr]').text(bet.homeTeamAbbr).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamSpread]').text(bet.homeTeamSpread).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamSpreadVotes]').text(bet.homeTeamSpreadVotes).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamML]').text(bet.homeTeamML).attr('data-id', bet._id);
	$(betHTML).find('[data-title=homeTeamMLVotes]').text(bet.homeTeamMLVotes).attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUOver]').attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUOverValue]').text("(" + bet.betOUOverValue + ")").attr('data-id', bet._id);
	$(betHTML).find('[data-title=betOUOverVotes]').text(bet.betOUOverVotes).attr('data-id', bet._id);
	// $('body').append("<p><a href='https://sports.bovada.lv" + bet.link + "'>" + bet.gameTitle + "</a></p>");
	// $('body').append("<p><span>" + bet.awayTeamAbbr + "</span> <span data-vote='awayTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.awayTeamSpread + "</span> <span>" + bet.awayTeamSpreadValue + "</span> <span data-vote='awayTeamMLVotes' data-id='" + bet._id + "'>" + bet.awayTeamML + "</span> <span data-vote='betMLUnderVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLUnderValue + "</span></p>");
	// $('body').append("<p><span>" + bet.homeTeamAbbr + "</span> <span data-vote='homeTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.homeTeamSpread + "</span> <span>" + bet.homeTeamSpreadValue + "</span> <span data-vote='homeTeamMLVotes' data-id='" + bet._id + "'>" + bet.homeTeamML + "</span> <span data-vote='betMLOverVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLOverValue + "</span></p>");
}

function updateData() {

}

// console.log(data)