'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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

//************  Local User **************//
var LocalUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});


//hashing a password before saving it to the database
LocalUserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
    bcrypt.hash(user.passwordConf, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.passwordConf = hash;
        next();
    })
});

//authenticate input against database
LocalUserSchema.statics.authenticate = function(email, password, callback) {
    LocalUser.findOne({ email: email })
        .exec(function(err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

var LocalUser = mongoose.model('LocalUser', LocalUserSchema);
module.exports = LocalUser;

//************** Google Login Schema ************//

var GoogleUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String
    },
    googleId: {
        type: String
    }
});

var GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);
module.exports = GoogleUser;

//************** Bets Schema **********//

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
    homeTeamAbbr: {
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
    awayTeamAbbr: {
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
    betOU: {
        type: String
    },
    betOUOverValue: {
        type: String
    },
    betOUOverVotes: {
        type: Number
    },
    betOUUnderValue: {
        type: String
    },
    betOUUnderVotes: {
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
// module.exports = mongoose.model('Betters', BettersSchema);
module.exports = mongoose.model('Bets', BetsSchemaNBA);