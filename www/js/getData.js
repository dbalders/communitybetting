// $.ajax({
//   dataType: "json",
//   url: "localhost:3000/api/bets/",
//   data: data,
//   success: success
// });

$.getJSON("http://localhost:3000/api/bets/", function(data) {
	var bets = [];
	data = data.data
	$.each(data, function(key, bet) {
		for (var i = 0; i < Object.keys(bet).length; i++) {
			// console.log(Object.keys(bet)[i])
			// console.log(Object.values(bet)[i])
			if (Object.values(bet) === undefined) {
				Object.values(bet) = "";
			}
		}
		buildBets(bet);
		console.log(bet);
	});
	vote();
});

function buildBets(bet) {
	$('body').append("<p><a href='https://sports.bovada.lv" + bet.link + "'>" + bet.gameTitle + "</a></p>");
	$('body').append("<p><span data-vote='homeTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.homeTeamSpread + "</span> <span>" + bet.homeTeamSpreadValue + "</span> <span data-vote='homeTeamMLVotes' data-id='" + bet._id + "'>" + bet.homeTeamML + "</span> <span data-vote='betMLOverVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLOverValue + "</span></p>");
	$('body').append("<p><span data-vote='awayTeamSpreadVotes' data-id='" + bet._id + "'>" + bet.awayTeamSpread + "</span> <span>" + bet.awayTeamSpreadValue + "</span> <span data-vote='awayTeamMLVotes' data-id='" + bet._id + "'>" + bet.awayTeamML + "</span> <span data-vote='betMLUnderVotes' data-id='" + bet._id + "'>" + bet.betML + " " + bet.betMLUnderValue + "</span></p>");
}

// console.log(data)