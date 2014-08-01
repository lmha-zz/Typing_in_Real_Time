module.exports = function Route(app) {

	var existing_users = {};

	app.get('/', function(req, res) {
		res.render('client', {title: 'Group Chat', sessionID: req.sessionID});
	});

	app.io.route('new_user_join', function(req) {
		req.io.emit('existing_users', existing_users);
		req.io.emit('yourself', { new_user: req.data, sessionID: req.sessionID });
		req.io.broadcast('new_user_joined', { new_user: req.data, sessionID: req.sessionID });
		existing_users[req.sessionID] = req.data;
	})

	app.io.route('typing_message', function(req) {
		req.io.broadcast('new_user_message', { userID: req.sessionID, message: req.data });
	})

	app.io.route('disconnect', function(req) {
		var removeID = req.sessionID;
		delete existing_users[removeID];
		app.io.broadcast('user_disconnected', req.sessionID);
	})

}