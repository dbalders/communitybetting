'use strict';

var bovada = require('../../data/bovada');


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks'),
    Better = mongoose.model('Betters'),
    Bets = mongoose.model('Bets');

exports.list_all_betters = function(req, res) {
    Better.find({}, function(err, better) {
        if (err)
            res.send(err);
        res.json({ "posts": better });
    });
};

exports.list_all_bets = function(req, res) {
    Bets.find({}, function(err, bets) {
        if (err)
            res.send(err);
        res.json({ 'data': bets });
    }).sort({date : 1})
};

exports.get_all_bets = function(req, res) {
    bovada.bovadaNBA();
    res.json({ message: 'All bets successfully retreived' });

};

exports.list_one_bet = function(req, res) {
    Bets.findById(req.params.betId, function(err, bet) {
        if (err)
            res.send(err);
        res.json(bet);
    });
};

exports.update_a_bet = function(req, res) {
    Bets.findOneAndUpdate({ _id: req.params.betId }, req.body, { new: true }, function(err, bet) {
        if (err)
            res.send(err);
        res.json(bet);
    });
};

exports.vote_on_a_bet = function(req, res) {
    var data = req.body.data
    var voteName = data['betVote']
    Bets.findOneAndUpdate({ _id: data['betId'] }, { $inc: { [voteName] : 1 } }, { new: true }, function(err, bet) {
        if (err)
            res.send(err);
        res.json(bet);
    });
};

exports.delete_vote_on_a_bet = function(req, res) {
    var data = req.body.data
    var voteName = data['betVote']
    Bets.findOneAndUpdate({ _id: data['betId'] }, { $inc: { [voteName] : -1 } }, { new: true }, function(err, bet) {
        if (err)
            res.send(err);
        res.json(bet);
    });
};

exports.delete_all_bets = function(req, res) {
    Bets.remove({}, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'All bets successfully deleted' });
    });
};

exports.create_a_better = function(req, res) {
    var new_better = new Better(req.body);
    new_better.save(function(err, better) {
        if (err)
            res.send(err);
        res.json(better);
    });
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};