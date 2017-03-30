loginVerify = function(socket){
    socket.on('login', function(msg){
		var incomingMsg = JSON.parse(msg);
		var username = incomingMsg.username;
		var password = incomingMsg.password;

        login(username, password, socket);
    });
}
