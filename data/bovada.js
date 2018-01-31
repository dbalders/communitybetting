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

function createBet(json, Bets, nbaEventsJson) {
	//Check to see if that bet already exists in the database
	Bets.findOne({ id: nbaEventsJson.id }, function(error, bet) {
		if (error) {

		}

		//If the bet doesn't already exist
		if (!bet) {
			//Check betting attributes
			var betsList = checkBets(nbaEventsJson);

			var homeTeam = nbaEventsJson.competitors[0].description;
			var awayTeam = nbaEventsJson.competitors[1].description;
			var homeTeamSpread = "";
			var awayTeamSpread = "";
			var homeTeamSpreadValue = "";
			var awayTeamSpreadValue = "";
			var homeTeamML = "";
			var awayTeamML = "";
			var overLine = "";
			var underLine = "";
			var betML = "";
			var betMLOverValue = "";
			var betMLUnderValue = "";

			//If the point spread exists, set the variables 
			if (betsList[0]) {
				//If home team is listed first
				if (nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].type === "H") {
					homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
					awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
					homeTeamSpreadValue = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;
					awayTeamSpreadValue = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;

					if (betsList[1]) {
						homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
						awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
					}
				} else {
					homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
					awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
					homeTeamSpreadValue = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
					awayTeamSpreadValue = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;

					if (betsList[1]) {
						homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
						awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
					}
				}
				if (betsList[2]) {
					// console.log('here')
					betML = nbaEventsJson.displayGroups[0].itemList[2].outcomes[0].price.handicap;
					betMLOverValue = nbaEventsJson.displayGroups[0].itemList[2].outcomes[0].price.american;
					betMLUnderValue = nbaEventsJson.displayGroups[0].itemList[2].outcomes[1].price.american;
				}
			}

			//Create the bet
			Bets.create({
				id: nbaEventsJson.id,
				sport: nbaEventsJson.type,
				link: nbaEventsJson.link,
				date: nbaEventsJson.startTime,
				gameTitle: nbaEventsJson.description,
				homeTeam: homeTeam,
				homeTeamSpread: homeTeamSpread,
				homeTeamSpreadValue: homeTeamSpreadValue,
				homeTeamSpreadVotes: 0,
				homeTeamML: homeTeamML,
				homeTeamMLVotes: 0,
				awayTeam: awayTeam,
				awayTeamSpread: awayTeamSpread,
				awayTeamSpreadValue: awayTeamSpreadValue,
				awayTeamSpreadVotes: 0,
				awayTeamML: awayTeamML,
				awayTeamMLVotes: 0,
				betML: betML,
				betMLOverValue: betMLOverValue,
				betMLOverVotes: 0,
				betMLUnderValue: betMLUnderValue,
				betMLUnderVotes: 0,
				origHomeTeamSpread: homeTeamSpread,
				origHomeTeamSpreadValue: homeTeamSpreadValue,
				origHomeTeamML: homeTeamML,
				origAwayTeamSpread: awayTeamSpread,
				origAwayTeamSpreadValue: awayTeamSpreadValue,
				origAwayTeamML: awayTeamML
			});
		} else {
			updateBets(bet);
		}

	});
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

		if (item.description === "Total" && item.outcomes[0].price !== undefined) {
			hasOU = true;
		}
	})

	return ([hasPointSpread, hasML, hasOU]);
}

function updateBets(bet) {
	//work on this once you have data after the games tonight to test if updating
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
						id: bets[i].gameTitle
					};
					console.log(response);
					// res.status(200).send(response);
				});
			}
		}
	});
}