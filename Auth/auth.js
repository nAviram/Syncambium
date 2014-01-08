
var	passport = require('passport');
var	localStrategy = require('passport-local').Strategy;

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