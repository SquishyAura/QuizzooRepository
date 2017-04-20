var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

var correctAnswerMultipleChoice = [];
var correctAnswerCheckboxes = [];

insertQuiz = function(socket){
    socket.on('quiz', function(msg){
        let incomingMsg = JSON.parse(msg);
        incomingMsg.id = generateUUID();
        insertDocument(incomingMsg);
    });
}

submitQuiz = function(socket){
    socket.on('submitQuiz', function(data, callback){
        var incomingMsg = JSON.parse(data);
        var returnSubmittedQuiz = {
            correctAnswerMultipleChoice: handleMultiplechoiceAnswers(incomingMsg.radiobuttons, incomingMsg.quizToDisplay),
            correctAnswerCheckboxes: handleCheckboxesAnswers(incomingMsg.checkboxes, incomingMsg.quizToDisplay),
        }
        callback('error', returnSubmittedQuiz);
    })
}

function handleMultiplechoiceAnswers(radiobuttons, quizToDisplay){
    var radiobuttonIndex = 0;
    correctAnswerMultipleChoice = [];
    var isCorrect = false;

    for(var i = 0; i < quizToDisplay.length; i++){
        for(var j = 0; j < quizToDisplay[i].questions.length; j++){
            if(quizToDisplay[i].questions[j].types == "Multiple-choice"){
                for(var k = 0; k < quizToDisplay[i].questions[j].answers.length; k++){
                    if(radiobuttons[radiobuttonIndex] == true && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct'){ 
                        isCorrect = true;
                    }
                    if(radiobuttons[radiobuttonIndex] == false && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct'){ 
                        isCorrect = false;
                    }
                    radiobuttonIndex++;
                }
                if(isCorrect == true){
                    correctAnswerMultipleChoice[j] = 'Correct';  
                }
                else
                {
                    correctAnswerMultipleChoice[j] = 'Incorrect';
                }
            }
        }
    }
    
    return correctAnswerMultipleChoice;
}

function handleCheckboxesAnswers(checkboxes, quizToDisplay){
    var checkboxesIndex = 0;
    correctAnswerCheckboxes = [];
    var isCorrect = false;

    for(var i = 0; i < quizToDisplay.length; i++){ 
        for(var j = 0; j < quizToDisplay[i].questions.length; j++){  
            if(quizToDisplay[i].questions[j].types == "Checkboxes"){
                for(var k = 0; k < quizToDisplay[i].questions[j].answers.length; k++){
                    console.log("index " + k + " contains " + quizToDisplay[i].questions[j].answers[k].correctAnswer);
                    console.log("checkbox " + checkboxesIndex + " is " + checkboxes[checkboxesIndex]);
                    if(checkboxes[checkboxesIndex] == false && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct'){ //if user selected a correct answer, continue
                        isCorrect = false;
                    }
                    if(checkboxes[checkboxesIndex] == true && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Incorrect')
                    {
                        isCorrect = false;
                    }
                    if(checkboxes[checkboxesIndex] == true && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct')
                    {
                        isCorrect = true;
                    }

                    checkboxesIndex++;
                }
                if(isCorrect == true){
                    correctAnswerCheckboxes[j] = 'Correct';
                }
                else
                {
                    correctAnswerCheckboxes[j] = 'Incorrect';
                }
            }
        }
    }

    console.log(correctAnswerCheckboxes)
    return correctAnswerCheckboxes;
}

function generateUUID() {
    var date = new Date().getTime();
    var uuid = 'xxxxxxxx-x9xx-xxxx-pxxx-xxxxxxxx1xxx'.replace(/[xy]/g, function(c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};