#!/usr/bin/env node

// https://github.com/websockets/ws

//server instance attached to Node.js HTTP server 
var server = require('http').createServer();
var io = require('./node_modules/socket.io')(server); 

var path = require('path');
var updater = require(path.resolve(__dirname, "./RegisterVerify.js")); //'__dir' is the directory name of the current module
var updater = require(path.resolve(__dirname, "./LoginVerify.js"));
var updater = require(path.resolve(__dirname, "./QuizVerify.js"));
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

io.on('connect', function (socket) {
	console.log("a user connected");

	loginVerify(socket); //checks whether user exists in database. If user does exist, they can log in.

	registrationVerify(socket); //register a user into database

	insertQuiz(socket); //insert a quiz into database
	deleteQuiz(socket); //deletes a quiz from database
	getPublicQuizzes(socket); //for display page
	getQuiz(socket); //for loading a single quiz page
	getMyQuizzes(socket); //for profile page
	getQuizStatistics(socket); //for statistics page
	submitQuiz(socket); //submit user's answers, then server checks if answers are correct or incorrect
	submitRating(socket); //submit user's ratings.
});

server.listen(9999, function() { //server listens to port 9999
	console.log("listening to: 9999");
});
