var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

registrationVerify = function(socket){
    socket.on('register', function(msg, callback){
		var incomingMsg = JSON.parse(msg);
		var username = incomingMsg.username;
		var password1 = incomingMsg.password1;
		var password2 = incomingMsg.password2;
		
		if(emptyFields(username, password1, password2) == false &&
		   invalidAmountChars(username, password1, password2) == false &&
		   passNotMatching(password1, password2) == false)
		{
			//INSERT TO DATABASE
			registerAccount(username, password1, socket, callback);
		}
		else
		{
			if(emptyFields(username, password1, password2) == true){
				callback('error', "Please fill out all fields.");
			}
			else if(invalidAmountChars(username, password1, password2) == true){
				callback('error', "Username & Password must be between 5-20 characters long.");
			}
			else if(passNotMatching(password1, password2) == true){
				callback('error', "The passwords do not match.");
			}
		}
		//getAccounts();
	});
}

emptyFields = function(username, password1, password2){
	if(username == "" || password1 == "" || password2 == "" || username == null || password1 == null || password2 == null){ //if some fields are empty
		//callback('error', "Please fill out all fields.");
		return true;
	}
	return false;
}

invalidAmountChars = function(username, password1, password2){
	if(username.length > 20 || password1.length > 20 || password2.length > 20 || username.length < 5 || password1.length < 5 || password2.length < 5){ //if username or password are too long/short
		//callback('error', "Username & Password must be between 5-20 characters long.");
		return true;
	}
	return false;
}

passNotMatching = function(password1, password2){
	if(password1 != password2){ //if passwords don't match
		//callback('error', "The passwords do not match.");
		return true;
	}
	return false;
} 

usernameTaken = function(username1, username2){
	if(username1 == username2){
		return true;
	}
	return false;
}

