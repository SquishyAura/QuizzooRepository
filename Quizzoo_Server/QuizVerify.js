var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

insertQuiz = function(socket){
    socket.on('quiz', function(msg){
        let incomingMsg = JSON.parse(msg);
        incomingMsg.id = generateUUID();
        insertDocument(incomingMsg);
    });
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};