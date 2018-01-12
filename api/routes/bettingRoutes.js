'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/bettingController');
    var betters = require('../controllers/bettingController');

    // todoList Routes
    app.route('/betters')
        .get(betters.list_all_betters)
        .post(betters.create_a_better);

    app.route('/bets')
    	.get(betters.list_all_bets)
    	.post(betters.get_all_bets)
    	.delete(betters.delete_all_bets);
};