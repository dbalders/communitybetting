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
    gameID: {
        type: String
    },
    homeTeam: {
        type: String
    },
    homeTeamSpread: {
        type: String
    },
    homeTeamLine: {
        type: String
    },
    homeTeamValue: {
        type: String
    },
    homeTeamML: {
        type: String
    },
    awayTeam: {
        type: String
    },
    awayTeamSpread: {
        type: String
    },
    awayTeamLine: {
        type: String
    },
    awayTeamValue: {
        type: String
    },
    awayTeamML: {
        type: String
    },
    origHomeTeamSpread: {
        type: String
    },
    origHomeTeamLine: {
        type: String
    },
    origHomeTeamValue: {
        type: String
    },
    origHomeTeamML: {
        type: String
    },
    origAwayTeamSpread: {
        type: String
    },
    origAwayTeamLine: {
        type: String
    },
    origAwayTeamValue: {
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