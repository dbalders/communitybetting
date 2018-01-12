var request = require("request")
// var parser = require("xml2json")

const url = "https://sports.bovada.lv/basketball/nba?json=true"

function checkBets(nbaEventsJson) {
    var hasPointSpread = false;
    var hasML = false;

    nbaEventsJson.displayGroups[0].itemList.forEach(function(item) {
        // console.log(item.outcomes[0].price)
        if (item.description === "Point Spread" && item.outcomes[0].price !== undefined) {
            hasPointSpread = true;
        }
        if (item.description === "Moneyline" && item.outcomes[0].price !== undefined) {
            hasML = true;
        }
    })

    return ([hasPointSpread, hasML]);
}

function createBet(json, Bets, nbaEventsJson) {
	console.log(Bets.findOne({ gameID: nbaEventsJson.id }))
    Bets.findOne({ gameID: nbaEventsJson.id }, function(error, bet) {
        // if (bet && !error) {
        //     //If bet exists, update the spreads
        //     // console.log(bet.gameTitle + "here");
        // } else {
        // console.log(nbaEventsJson.Competitor[0].Line.length)
        // if (Object.keys(nbaEventsJson.Competitor[0].Line).length === 2) {
        // 	let choiceExists = 'Choice' in nbaEventsJson.Competitor[0].Line[0];
        // } else {
        // 	let choiceExists = 'Choice' in nbaEventsJson.Competitor[0].Line;
        // }

        // console.log(nbaEventsJson.displayGroups[0].itemList)
        var betsList = checkBets(nbaEventsJson);
        // console.log(betsList[0]);

        var homeTeam = nbaEventsJson.competitors[0].description;
        var awayTeam = nbaEventsJson.competitors[1].description;
        // console.log(nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].type)

        if (betsList[0]) {
            if (nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].type === "H") {
                // console.log(true + "here")
                // console.log(nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price);
                var homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
                var awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
                var homeTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;
                // var awayTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
                // var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
                // var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
                if (betsList[1]) {
                    var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
                    var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
                }
            } else {
                // console.log(false + "here");
                // // console.log(nbaEventsJson.displayGroups[0].itemList[0]);
                // console.log(nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price)

                var homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
                var awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;
                var homeTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
                var awayTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
                // var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
                // var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
                if (betsList[1]) {
                    var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;
                    var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
                }
            }
        }


        // var homeTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.handicap;
        // var awayTeamSpread = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.american;
        // var homeTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[0].price.american;
        // var awayTeamLine = nbaEventsJson.displayGroups[0].itemList[0].outcomes[1].price.handicap;
        // var homeTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[0].price.american;
        // var awayTeamML = nbaEventsJson.displayGroups[0].itemList[1].outcomes[1].price.american;

        // // console.log(nbaEventsJson.Competitor[0].Line.Choice.NUMBER)

        // // if ((nbaEventsJson.Competitor[0].Line).length === 2) {
        Bets.create({
            gameID: nbaEventsJson.id,
            // date: json.Schedule.EventType.Date.DTEXT,
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
        // } else {
        //     Bets.create({
        //         gameID: nbaEventsJson.ID,
        //         date: json.Schedule.EventType.Date.DTEXT,
        //         gameTitle: nbaEventsJson.NAME,
        //         homeTeam: nbaEventsJson.Competitor[0].NAME,
        //         homeTeamSpread: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.NUMBER : 'NA',
        //         homeTeamLine: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.Odds.Line : 'NA',
        //         homeTeamValue: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.VALUE : 'NA',
        //         homeTeamML: 'NA',
        //         awayTeam: nbaEventsJson.Competitor[1].NAME,
        //         awayTeamSpread: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.NUMBER : 'NA',
        //         awayTeamLine: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.Odds.Line : 'NA',
        //         awayTeamValue: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.VALUE : 'NA',
        //         awayTeamML: 'NA',
        //         origHomeTeamSpread: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.NUMBER : 'NA',
        //         origHomeTeamLine: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.Odds.Line : 'NA',
        //         origHomeTeamValue: choiceExists ? nbaEventsJson.Competitor[0].Line.Choice.VALUE : 'NA',
        //         origHomeTeamML: 'NA',
        //         origAwayTeamSpread: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.NUMBER : 'NA',
        //         origAwayTeamLine: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.Odds.Line : 'NA',
        //         origAwayTeamValue: choiceExists ? nbaEventsJson.Competitor[1].Line.Choice.VALUE : 'NA',
        //         origAwayTeamML: 'NA'
        //     });
        // }

        // }
    });
}

exports.bovadaNBA = function() {
    request({
        url: url
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // var json = parser.toJson(body);
            var json = JSON.parse(body, (key, value) =>
                typeof value === 'undefined' ?
                "NA" //return anything missing as NA
                :
                value // return everything else unchanged
            );
            // console.log(json.data.regions.content_center[Object.keys(json)[0]]["json-var"])
            var nbaEvents = json.data.regions.content_center;
            var nbaEventsJson = nbaEvents[Object.keys(nbaEvents)[0]]['json-var'].value.items[0].itemList.items
            // console.log(nbaEventsJson.length);

            // console.log(json.Schedule.EventType.Date[0].Event)
            var mongoose = require('mongoose'),
                Bets = mongoose.model('Bets');

            for (var i in nbaEventsJson) {
                // console.log(nbaEventsJson[i].Competitor[0].Line.ORDER)
                // console.log(Object.keys(nbaEventsJson[i].Competitor[0].Line).length)

                //Check to see if bet exists in the system
                //Basically seeing if a new day of bets

                // let number = (nbaEventsJson[i].Competitor[0].Line.Choice.NUMBER) || 'test'
                // console.log(number);
                createBet(json, Bets, nbaEventsJson[i]);
            }
        }
    })
}