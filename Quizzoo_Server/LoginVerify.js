var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

loginVerify = function(socket){
    socket.on('login', function(msg, callback){
		var incomingMsg = JSON.parse(msg);
		var username = incomingMsg.username;
		var password = incomingMsg.password;
        
        loginAccount(username, password, socket, callback);
    });
}
