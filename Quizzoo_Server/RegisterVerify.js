var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

registrationVerify = function(socket){
    socket.on('register', function(msg, callback){
		var incomingMsg = JSON.parse(msg);
		var username = incomingMsg.username;
		var password1 = incomingMsg.password1;
		var password2 = incomingMsg.password2;
		
		if(emptyFields(username, password1, password2, socket, callback) == false &&
		   invalidAmountChars(username, password1, password2, socket, callback) == false &&
		   passNotMatching(password1, password2, socket, callback) == false)
		{
			//INSERT TO DATABASE
			registerAccount(username, password1, socket, callback);
		}
		//getAccounts();
	});
}

function emptyFields(username, password1, password2, socket, callback){
	if(username == "" || password1 == "" || password2 == "" || username == null || password1 == null || password2 == null){ //if some fields are empty
		callback('error', "Please fill out all fields.");
		return true;
	}
	return false;
}

function invalidAmountChars(username, password1, password2, socket, callback){
	if(username.length > 20 || password1.length > 20 || password2.length > 20 || username.length < 5 || password1.length < 5 || password2.length < 5){ //if username or password are too long/short
		callback('error', "Username & Password must be between 5-20 characters long.");
		return true;
	}
	return false;
}

function passNotMatching(password1, password2, socket, callback){
	if(password1 != password2){ //if passwords don't match
		callback('error', "The passwords do not match.");
		return true;
	}
	return false;
}