'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/bettingController');
    var betters = require('../controllers/bettingController');

    // todoList Routes
    app.route('/betters')
        .get(betters.list_all_betters)
        .post(betters.create_a_better);


    // app.route('/tasks/:taskId')
    //     .get(todoList.read_a_task)
    //     .put(todoList.update_a_task)
    //     .delete(todoList.delete_a_task);

    app.route('/bets')
    	.get(betters.list_all_bets)
    	.post(betters.get_all_bets)
    	.delete(betters.delete_all_bets);
};