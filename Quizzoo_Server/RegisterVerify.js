var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

registrationVerify = function(socket){
    socket.on('register', function(msg){
		var incomingMsg = JSON.parse(msg);
		var username = incomingMsg.username;
		var password1 = incomingMsg.password1;
		var password2 = incomingMsg.password2;
		
		if(emptyFields(username, password1, password2, socket) == false &&
		   invalidAmountChars(username, password1, password2, socket) == false &&
		   passNotMatching(password1, password2, socket) == false)
		{
			//INSERT TO DATABASE
			registerAccount(username, password1, socket);
		}
		//getAccounts();
	});
}

function emptyFields(username, password1, password2, socket){
	if(username == "" || password1 == "" || password2 == "" || username == null || password1 == null || password2 == null){ //if some fields are empty
		var fieldsEmpty = true;
		var fieldsError = {
			fieldsEmpty: fieldsEmpty
		}	
		socket.emit('registerError', JSON.stringify(fieldsError));
		return true;
	}
	return false;
}

function invalidAmountChars(username, password1, password2, socket){
	if(username.length > 20 || password1.length > 20 || password2.length > 20 || username.length < 5 || password1.length < 5 || password2.length < 5){ //if username or password are too long/short
		var invalidLength = true;
		var lengthError = {
			invalidLength: invalidLength
		}
		socket.emit('registerError', JSON.stringify(lengthError))
		return true;
	}
	return false;
}

function passNotMatching(password1, password2, socket){
	if(password1 != password2){ //if passwords don't match
		var passwordNotMatching = true;
		var passwordError = {
			passwordNotMatching: passwordNotMatching
		}
		socket.emit('registerError', JSON.stringify(passwordError));
		return true;
	}
	return false;
}