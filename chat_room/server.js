

var io = require('socket.io'),
	connect = require('connect'),
	chatter = require('chatter'),
	DBconnector = require('mySQLconnect');
	//express = require('express');
  
var app = connect().use(connect.static('public')).listen(3000);
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