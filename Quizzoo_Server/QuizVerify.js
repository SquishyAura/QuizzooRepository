var path = require('path');
var updater = require(path.resolve(__dirname, "./DocumentDBController.js"));

insertQuiz = function(socket){
    socket.on('quiz', function(msg){
        var incomingMsg = JSON.parse(msg);
        incomingMsg.id = generateUUID();
        insertQuizDocument(incomingMsg);
    });
}

submitQuiz = function(socket){
    socket.on('submitQuiz', function(data, callback){
        var incomingMsg = JSON.parse(data);
        
        var storedProcedureArray = [];

        var multipleChoiceArray = handleMultiplechoiceAnswers(incomingMsg.radiobuttons, incomingMsg.quizToDisplay, storedProcedureArray);
        var checkboxesArray = handleCheckboxesAnswers(incomingMsg.checkboxes, incomingMsg.quizToDisplay, storedProcedureArray);
        var cleanedJoinedFeedbackArray = removeEmptyElementsInArray(multipleChoiceArray, checkboxesArray);
        console.log(cleanedJoinedFeedbackArray);
        updateStatistics(incomingMsg.quizToDisplay[0].id, storedProcedureArray, cleanedJoinedFeedbackArray, incomingMsg.currentUser);

        var returnSubmittedQuiz = {
            feedbackArray: cleanedJoinedFeedbackArray,
        }
        callback('error', returnSubmittedQuiz);
    })
}

function handleMultiplechoiceAnswers(radiobuttons, quizToDisplay, storedProcedureArray){
    var correctAnswerMultipleChoice = [];
    var radiobuttonIndex = 0;
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

                    //we save all selected answers and add them to database at once, for the statistics page. 
                    if(radiobuttons[radiobuttonIndex] == true)
                    {
                        storedProcedureArray.push(j + " " + k + " selected");
                    }
                    else
                    {
                        storedProcedureArray.push(j + " " + k + " unselected");
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

function handleCheckboxesAnswers(checkboxes, quizToDisplay, storedProcedureArray){
    var correctAnswerCheckboxes = [];
    var checkboxesIndex = 0;
    var isCorrect = false;

    for(var i = 0; i < quizToDisplay.length; i++){ 
        for(var j = 0; j < quizToDisplay[i].questions.length; j++){  
            if(quizToDisplay[i].questions[j].types == "Checkboxes"){
                for(var k = 0; k < quizToDisplay[i].questions[j].answers.length; k++){
                    if(checkboxes[checkboxesIndex] == false && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct'){ //if user selected a correct answer, continue
                        isCorrect = false;
                    }
                    if(checkboxes[checkboxesIndex] == true && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Incorrect')
                    {
                        isCorrect = false;
                    }
                    if(checkboxes[checkboxesIndex] == false && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Incorrect')
                    {
                        isCorrect = true;
                    }
                    if(checkboxes[checkboxesIndex] == true && quizToDisplay[i].questions[j].answers[k].correctAnswer == 'Correct')
                    {
                        isCorrect = true;
                    }

                    var checkboxesIndexGoingBackwards = checkboxesIndex;
                    for(var l = k; l >= 0; l--){
                        if(checkboxes[checkboxesIndexGoingBackwards] == false && quizToDisplay[i].questions[j].answers[l].correctAnswer == 'Correct'){ //if user selected a correct answer, continue
                            isCorrect = false;
                        }
                        if(checkboxes[checkboxesIndexGoingBackwards] == true && quizToDisplay[i].questions[j].answers[l].correctAnswer == 'Incorrect')
                        {
                            isCorrect = false;
                        }
                        checkboxesIndexGoingBackwards--;
                    }

                    //we save all selected answers and add them to database at once, for the statistics page. 
                    if(checkboxes[checkboxesIndex] == true)
                    {
                        storedProcedureArray.push(j + " " + k + " selected");
                    }
                    else
                    {
                        storedProcedureArray.push(j + " " + k + " unselected");
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

    return correctAnswerCheckboxes;
}

function removeEmptyElementsInArray(array1, array2){
    var cleanedArray = [];
    for(var i = 0; i < array1.length; i++){
        if(array1[i]){
            cleanedArray[i] = array1[i];
        }
    }

    for(var i = 0; i < array2.length; i++){
        if(array2[i]){
            cleanedArray[i] = array2[i];
        }
    }

    return cleanedArray;
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