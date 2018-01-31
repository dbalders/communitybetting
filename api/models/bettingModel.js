'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

var BettersSchema = new Schema({
    email: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    twitter: {
        type: String
    }
});

var BetsSchemaNBA = new Schema({
    gameTitle: {
        type: String
    },
    id: {
        type: String
    },
    sport: {
        type: String
    },
    link: {
        type: String
    },
    homeTeam: {
        type: String
    },
    homeTeamSpread: {
        type: String
    },
    homeTeamSpreadValue: {
        type: String
    },
    homeTeamSpreadVotes: {
        type: Number
    },
    homeTeamML: {
        type: String
    },
    homeTeamMLVotes: {
        type: Number
    },
    awayTeam: {
        type: String
    },
    awayTeamSpread: {
        type: String
    },
    awayTeamSpreadValue: {
        type: String
    },
    awayTeamSpreadVotes: {
        type: Number
    },
    awayTeamML: {
        type: String
    },
    awayTeamMLVotes: {
        type: Number
    },
    betML: {
        type: String
    },
    betMLOverValue: {
        type: String
    },
    betMLOverVotes: {
        type: Number
    },
    betMLUnderValue: {
        type: String
    },
    betMLUnderVotes: {
        type: Number
    },
    origHomeTeamSpread: {
        type: String
    },
    origHomeTeamSpreadValue: {
        type: String
    },
    origHomeTeamML: {
        type: String
    },
    origAwayTeamSpread: {
        type: String
    },
    origAwayTeamSpreadValue: {
        type: String
    },
    origAwayTeamML: {
        type: String
    },
    date: {
        type: Number
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('Betters', BettersSchema);
module.exports = mongoose.model('Bets', BetsSchemaNBA);