#!/usr/bin/env node

// https://github.com/websockets/ws


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //server instance attached to an instance of http.Server listening for incoming events.

var path = require('path');
var updater = require(path.resolve(__dirname, "./RegisterVerify.js")); //'__dir' is the directory name of the current module
var updater = require(path.resolve(__dirname, "./LoginVerify.js"));

io.on('connect', function (socket) {
	console.log("a user connected");
	
	loginVerify(socket);

	registrationVerify(socket);
});


http.listen(9999, function() {
	console.log("listening to: 9999");
});
