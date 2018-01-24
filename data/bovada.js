var request = require("request")

//Grab the url (nba for now)
const url = "https://sports.bovada.lv/basketball/nba?json=true"

//Main function
exports.bovadaNBA = function() {
	//request the data from the url
	request({
		url: url
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var json = JSON.parse(body, (key, value) =>
                value // return everything unchanged (can manipulate later if wanted)
            );

			//Grab the full events json
			var nbaEvents = json.data.regions.content_center;
			//Grab the games via json
			var nbaEventsJson = nbaEvents[Object.keys(nbaEvents)[0]]['json-var'].value.items[0].itemList.items

			//Load the current bets and delete any in the database that are already over
			var mongoose = require('mongoose'),
				Bets = mongoose.model('Bets');
			deleteBets(Bets); //Delete any old bets

			//For each bet in the json, if it hasn't started go ahead and create a bet
			for (var i in nbaEventsJson) {
				var currentTime = new Date().getTime();

				if (new Date(nbaEventsJson[i].startTime) > currentTime) {
					createBet(json, Bets, nbaEventsJson[i]);
				}
			}
		}
	})
}

function checkBets(nbaEventsJson) {
	var hasPointSpread = false;
	var hasML = false;

	nbaEventsJson.displayGroups[0].itemList.forEach(function(item) {
		//If the point spread exists, set variable to true
		if (item.description === "Point Spread" && item.outcomes[0].price !== undefined) {
			hasPointSpread = true;
		}
		//If the moneyline exists, set the variable to true
		if (item.description === "Moneyline" && item.outcomes[0].price !== undefined) {
			hasML = true;
		}
	})

	return ([hasPointSpread, hasML]);
}

function deleteBets(Bets) {
	var currentTime = new Date().getTime();

	Bets.find({}, function(error, bets) {
		for (var i in bets) {
			if (bets[i].date < currentTime) {
				console.log(bets[i]._id);
				// Bets.find({id: bets[i].id}).remove(); //not removing the bet
				// console.log('removed');
				Bets.findByIdAndRemove(bets[i]._id, (err, todo) => {
					// We'll create a simple object to send back with a message and the id of the document that was removed
					// You can really do this however you want, though.
					let response = {
						message: "Bet successfully deleted",
						id: bets[i]._id
					};
					console.log(response);
					// res.status(200).send(response);
				});
			}
		}
	});
}

function createBet(json, Bets, nbaEventsJson) {
	//Check to see if that bet already exists in the database
	Bets.findOne({ gameID: nbaEventsJson.id }, function(error, bet) {
		if (error) {

		}

		//If the bet doesn't already exist
		if (!bet) { 
			//Check betting attributes
			var betsList = checkBets(nbaEventsJson);

			var homeTeam = nbaEventsJson.competitors[0].description;
			var awayTeam = nbaEventsJson.competitors[1].description;

			//If the point spread exists, set the variables 
			if (betsList[0]) {
				//If home team is listed first
				if (nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].type === "H") {
					var homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
					var awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
					var homeTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;

					if (betsList[1]) {
						var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
						var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
					}
				} else {
					var homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
					var awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;
					var homeTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
					var awayTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;

					if (betsList[1]) {
						var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
						var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
					}
				}
			}

			//Create the bet
			Bets.create({
				id: nbaEventsJson.id,
				date: nbaEventsJson.startTime,
				gameTitle: nbaEventsJson.description,
				homeTeam: homeTeam,
				homeTeamSpread: homeTeamSpread,
				homeTeamLine: homeTeamLine,
				// homeTeamValue: nbaEventsJson.Competitor[0].Line[0].Choice.VALUE,
				homeTeamML: homeTeamML,
				awayTeam: awayTeam,
				awayTeamSpread: awayTeamSpread,
				awayTeamLine: awayTeamLine,
				// awayTeamValue: nbaEventsJson.Competitor[1].Line[0].Choice.VALUE,
				awayTeamML: awayTeamML,
				origHomeTeamSpread: homeTeamSpread,
				origHomeTeamLine: homeTeamLine,
				// origHomeTeamValue: nbaEventsJson.Competitor[0].Line[0].Choice.VALUE,
				origHomeTeamML: homeTeamML,
				origAwayTeamSpread: awayTeamSpread,
				origAwayTeamLine: awayTeamLine,
				// origAwayTeamValue: nbaEventsJson.Competitor[1].Line[0].Choice.VALUE,
				origAwayTeamML: awayTeamML
			});
		}

	});
}