var request = require("request")
var parser = require("xml2json")

const url = "http://sportsfeeds.bovada.lv/basic/NBA.xml"

function createBet(json, Bets, nbaEventsJson) {
    Bets.findOne({ gameID: nbaEventsJson.ID }, function(error, bet) {
        // if (bet && !error) {
        //     //If bet exists, update the spreads
        //     // console.log(bet.gameTitle + "here");
        // } else {
            let choiceExists = 'Choice' in nbaEventsJson.Competitor[0].Line[0];
            console.log(choiceExists)
            console.log(nbaEventsJson.Competitor[0].Line[0].Choice.NUMBER)
            
            // console.log(nbaEventsJson.Competitor[0].Line.Choice.NUMBER)

            Bets.create({
                gameID: nbaEventsJson.ID,
                date: json.Schedule.EventType.Date.DTEXT,
                gameTitle: nbaEventsJson.NAME,
                homeTeam: nbaEventsJson.Competitor[0].NAME,
                homeTeamSpread: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.NUMBER : 'NA',
                homeTeamLine: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.Odds.Line : 'NA',
                homeTeamValue: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.VALUE : 'NA',
                homeTeamML: choiceExists ? nbaEventsJson.Competitor[0].Line[1].Choice.VALUE : 'NA',
                awayTeam: nbaEventsJson.Competitor[1].NAME,
                awayTeamSpread: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.NUMBER : 'NA',
                awayTeamLine: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.Odds.Line : 'NA',
                awayTeamValue: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.VALUE : 'NA',
                awayTeamML: choiceExists ? nbaEventsJson.Competitor[1].Line[1].Choice.VALUE : 'NA',
                origHomeTeamSpread: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.NUMBER : 'NA',
                origHomeTeamLine: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.Odds.Line : 'NA',
                origHomeTeamValue: choiceExists ? nbaEventsJson.Competitor[0].Line[0].Choice.VALUE : 'NA',
                origHomeTeamML: choiceExists ? nbaEventsJson.Competitor[0].Line[1].Choice.VALUE : 'NA',
                origAwayTeamSpread: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.NUMBER : 'NA',
                origAwayTeamLine: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.Odds.Line : 'NA',
                origAwayTeamValue: choiceExists ? nbaEventsJson.Competitor[1].Line[0].Choice.VALUE : 'NA',
                origAwayTeamML: choiceExists ? nbaEventsJson.Competitor[1].Line[1].Choice.VALUE : 'NA'
            });
        // }
    });
}

exports.bovadaNBA = function() {
    request({
        url: url
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var json = parser.toJson(body);
            json = JSON.parse(json, (key, value) =>
                typeof value === 'undefined' ?
                "NA" //return anything missing as NA
                :
                value // return everything else unchanged
            );

            var nbaEventsJson = json.Schedule.EventType.Date.Event;

            var mongoose = require('mongoose'),
                Bets = mongoose.model('Bets');

            for (var i in nbaEventsJson) {
                // console.log(nbaEventsJson[i].Competitor[0].Line.ORDER)
                console.log(nbaEventsJson[i].Competitor[0].Line[0].Choice.NUMBER)

                //Check to see if bet exists in the system
                //Basically seeing if a new day of bets

                // let number = (nbaEventsJson[i].Competitor[0].Line.Choice.NUMBER) || 'test'
                // console.log(number);
                createBet(json, Bets, nbaEventsJson[i]);
            }
        }
    })
}