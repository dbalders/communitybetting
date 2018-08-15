'use strict';
module.exports = function(app) {
	var betting = require('../controllers/bettingController');

	app.route('/api/betters')
		.get(betting.list_all_betters)
		.post(betting.create_a_better);

	app.route('/api/bets')
		.get(betting.list_all_bets)
		.post(betting.get_all_bets)
		.delete(betting.delete_all_bets);

	app.route('/api/bets/:betId')
		.get(betting.list_one_bet)
		.put(betting.update_a_bet);

	app.route('/api/vote')
		// .get(betting.list_all_bets)
		.put(betting.vote_on_a_bet)
		.delete(betting.delete_vote_on_a_bet);
};