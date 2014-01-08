

//var io = require('socket.io');
var	connect = require('connect');
//var	chatter = require('chatter');
//var	DBconnector = require('mySQLconnect');
var	passport = require('passport');

	localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
	function(username, password, done){
		if (username ==='admin' && password ==='123')
			return done(null,{username:'admin'});
	}
));

passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(username, done){
	done(null, {username: username});
});
  
var app = connect().use(connect.static('public')).listen(3000);
app.configure(function(){
	//app.use(connect.static(''))
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
});


var chat_room = io.listen(app);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket) {
  chatter.connect_chatter({
    socket: socket,
    username: socket.id,
	DBconnector: DBconnector
  });
});

//TODO: make more rooms 