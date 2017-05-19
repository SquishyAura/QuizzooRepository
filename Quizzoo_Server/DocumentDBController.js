var documentClient = require("./node_modules/documentdb").DocumentClient;

var databaseID = "quizzoo";
var quizzesCollectionID = "quizzes";
var accountsCollectionID = "accounts";
var client = new documentClient("https://quizzoo.documents.azure.com:443/", { "masterKey": "bNrOFgxeiq7QZzMEFMHuNSoASufi0JDPaCbk3vWLZyqpY7iC5iEdo3H0VeR59se3r7473PfnezkKcwAle8yy8A==" });

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${databaseID}`;
var quizzesCollectionUrl = `${databaseUrl}/colls/${quizzesCollectionID}`;
var accountsCollectionUrl = `${databaseUrl}/colls/${accountsCollectionID}`;

var path = require('path');
var updater = require(path.resolve(__dirname, "./RegisterVerify.js"));
/**
 * Get the database by ID, or create if it doesn't exist.
 * @param {string} database - The database to get or create
 */
function getDatabase() {
    return new Promise((resolve, reject) => {
        client.readDatabase(databaseUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDatabase(config.database, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Get the quizzes collection by ID, or create if it doesn't exist.
 */
function getCollection(collectionID, collectionUrl) {
    console.log(`Getting collection:\n${collectionID}\n`);

    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createCollection(databaseUrl, collectionID, { offerThroughput: 400 }, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Get the quiz document by ID, or create if it doesn't exist.
 * @param {function} callback - The callback function on completion
 */
function getDocument(document, url) {
    let documentUrl = `${url}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(url, document, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                client.createDocument(url, document, (err, created) => {
                    if (err) reject(err)
                    else resolve(created);
                });
                resolve(result);
            }
        });
    });
};

/**
 * Query the quizzes collection using SQL
 */
function queryCollection(collectionID, collectionUrl) {
    console.log(`Querying collection through index:\n${collectionID}`);
    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
            'SELECT * FROM quizzes q'
        ).toArray((err, results) => {
            if (err) { 
                console.log(err) ;
                reject(err)
            }
            else {
                /*for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }*/
                resolve(results);
            }
        });
    });
};

/**
 * Replace the document by ID.
 */
function replaceQuizDocument(document) {
    let documentUrl = `${quizzesCollectionUrl}/docs/${document.id}`;
    console.log("replacing");

    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, document, (err, result) => {
            if (err) {
                reject(err);
            } 
            else {
                resolve(result);
            }
        });
    });
};

/**
 * REGISTRATION & LOGIN
 */
registerAccount = function(username, password, socket, callback){ //Check if username exists in db. If not, register user.
    client.queryDocuments(accountsCollectionUrl, 'SELECT a.username FROM accounts a WHERE a.username = "' + username +'"').toArray((err, results) => {
        if (err) { 
            console.log(err);
        }
        else { 
            console.log(results[0]);
            if(results[0] == undefined){ //if username doesn't exist in db, user can register
                var saveAccountAsObject = {
                    id: generateUUID(),
                    username: username,
                    password: password
                }
                insertAccountDocument(saveAccountAsObject);

                callback('error', true);
            }
            else //if username exists in db, user can not register
            {
                
                if(usernameTaken(username, results[0].username) == true){
                    callback('error', "Username is already taken.");
                }
                //callback('error', "Username is already taken.");
            }
        }
    });
}

insertAccountDocument = function(document){
    getDatabase()
        .then(() => getCollection(accountsCollectionID, accountsCollectionUrl))
        .then(() => getDocument(document, accountsCollectionUrl))
        .then(() => queryCollection(accountsCollectionID, accountsCollectionUrl))
}

loginAccount = function(username, password, callback){
    client.queryDocuments(accountsCollectionUrl, 'SELECT a FROM accounts a WHERE a.username = "' + username +'" AND a.password = "' + password + '"').toArray((err, results) => {
        if (err) { 
            console.log(err);
        }
        else { 
            var correctAccout = true;

            if(results[0] == undefined){ //if username doesn't exist in db, user cannot log in
                correctAccout = false;
            }
            else //if username exists in db, user can log in
            {
                correctAccout = true;
            }

            callback('error', correctAccout);
        }
    });
}

function generateUUID() {
    var date = new Date().getTime();
    var uuid = 'xxaxxxxx-xxxx-xxxx-xxxx-xxxx9x2xxxxx'.replace(/[xy]/g, function(c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

/**
 * QUIZZES
 */
insertQuizDocument = function(document){
    getDatabase()
        .then(() => getCollection(quizzesCollectionID, quizzesCollectionUrl))
        .then(() => getDocument(document, quizzesCollectionUrl))
        .then(() => queryCollection(quizzesCollectionID, quizzesCollectionUrl))
}

submitRating = function(socket){
    socket.on('rating', function(msg) {
        var incomingMsg = JSON.parse(msg);

        for(var i = 0; i < incomingMsg.ratingsCheck.length; i++){
            if(incomingMsg.ratingsCheck[i] == true){
                let actualRating = i + 1; //since array starts at 0, we add with 1
                client.queryDocuments(quizzesCollectionUrl, 'SELECT * FROM quizzes q WHERE q.id = "' + incomingMsg.id +'"').toArray((err, results) => {
                    if (err) { 
                        console.log(err);
                    }
                    else {
                        results[0].ratings.push(actualRating);
                        replaceQuizDocument(results[0]);
                    }
                });
            }
        }
    });
}

updateStatistics = function(id, storedProcedureArray, cleanedJoinedFeedbackArray, currentUser){
    console.log(storedProcedureArray);
    client.queryDocuments(quizzesCollectionUrl, 'SELECT * FROM quizzes q WHERE q.id = "' + id +'"').toArray((err, results) => { //we first get quiz
        if (err) { 
            console.log(err);
        }
        else {
            updateNumberOfClicks(results, storedProcedureArray);
            updateIndividualFeedback(results, cleanedJoinedFeedbackArray, currentUser);
            replaceQuizDocument(results[0]);
        }
    });
}

updateNumberOfClicks = function(results, storedProcedureArray){
    for(var i = 0; i < storedProcedureArray.length; i++){
        var splittedArray = storedProcedureArray[i].split(" ");
        if(splittedArray[2] == "selected"){
            var incremented = parseInt(results[0].questions[splittedArray[0]].answers[splittedArray[1]].numberOfClicks) + 1;
            results[0].questions[splittedArray[0]].answers[splittedArray[1]].numberOfClicks = incremented.toString();
        }
    }
}

updateIndividualFeedback = function(results, cleanedJoinedFeedbackArray, currentUser){
    var feedbackString = currentUser + " answered ";
    for(var i = 0; i < cleanedJoinedFeedbackArray.length; i++){
        feedbackString = feedbackString + "question " + (i + 1) + " " + cleanedJoinedFeedbackArray[i];
        if(i == cleanedJoinedFeedbackArray.length - 1){ //if end of array (sentence)
            feedbackString = feedbackString + ".";
        }
        else
        {
            feedbackString = feedbackString + ", ";
        }
    }
    results[0].individualFeedback.push(feedbackString);
}

getPublicQuizzes = function(socket){
    socket.on('getPublicQuizzes', function(data, callback) {
        client.queryDocuments(
            quizzesCollectionUrl,
            'SELECT * FROM quizzes q WHERE q.access = "Public"'
        ).toArray((err, results) => {
            if (err) { 
                console.log(err);
            }
            else {
                /*for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }*/
                callback('error', results)
            }
        });
    });
}

getQuiz = function(socket){
    socket.on('getQuiz', function(data, callback) {
        let incomingMessage = JSON.parse(data);
        var id = incomingMessage.split("/");
        client.queryDocuments(
            quizzesCollectionUrl,
            'SELECT * FROM quizzes q WHERE q.id = "' + id[3] +'"'
        ).toArray((err, results) => {
            if (err) { 
                console.log(err);
            }
            else {
                callback('error', results)
            }
        });
    })
}

getQuizStatistics = function(socket){
    socket.on('getQuizStatistics', function(data, callback) {
        let incomingMessage = JSON.parse(data);
        client.queryDocuments(
            quizzesCollectionUrl,
            'SELECT * FROM quizzes q WHERE q.id = "' + incomingMessage +'"'
        ).toArray((err, results) => {
            if (err) { 
                console.log(err);
            }
            else {
                callback('error', results)
            }
        });
    })
}

deleteQuiz = function(socket){
    socket.on('deleteQuiz', function(msg) {
        let incomingMessage = JSON.parse(msg);
        let documentUrl = `${quizzesCollectionUrl}/docs/${incomingMessage}`;

        return new Promise((resolve, reject) => {
            client.deleteDocument(documentUrl, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    })
}

getMyQuizzes = function(socket){
    socket.on('getMyQuizzes', function(data, callback){
        let incomingMessage = JSON.parse(data);
        client.queryDocuments(
            quizzesCollectionUrl,
            'SELECT * FROM quizzes q WHERE q.owner = "' + incomingMessage + '"'
        ).toArray((err, results) => {
            if (err) { 
                console.log(err) ;
            }
            else {
                /*for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }*/
                callback('error', results)
            }
        });
    })
}