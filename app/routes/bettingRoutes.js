'use strict';
var passport = require('passport');

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
		// .get(betters.list_all_bets)
		.put(betting.vote_on_a_bet)
		.delete(betting.delete_vote_on_a_bet);

	app.route('/api/register')
		.post(betting.create_a_better)

	app.route('/api/login')
		.post(betting.better_login)

	// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
};