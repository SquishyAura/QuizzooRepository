var documentClient = require("documentdb").DocumentClient;
var config = require("./config");
var url = require('url');

var databaseID = "quizzoo";
var collectionID = "quizzes";
var client = new documentClient("https://quizzoo.documents.azure.com:443/", { "masterKey": "bNrOFgxeiq7QZzMEFMHuNSoASufi0JDPaCbk3vWLZyqpY7iC5iEdo3H0VeR59se3r7473PfnezkKcwAle8yy8A==" });

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${databaseID}`;
var collectionUrl = `${databaseUrl}/colls/${collectionID}`;


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
 * Get the collection by ID, or create if it doesn't exist.
 */
function getCollection() {
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
 * Get the document by ID, or create if it doesn't exist.
 * @param {function} callback - The callback function on completion
 */
function getQuizDocument(document) {
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(collectionUrl, document, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                client.createDocument(collectionUrl, document, (err, created) => {
                    if (err) reject(err)
                    else resolve(created);
                });
                resolve(result);
            }
        });
    });
};

/**
 * Query the collection using SQL
 */
function queryCollection() {
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
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
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

insertDocument = function(document){
    getDatabase()
        .then(() => getCollection())
        .then(() => getQuizDocument(document))
        .then(() => queryCollection())
}

updateNumberOfClicks = function(id, storedProcedureArray){
    console.log(storedProcedureArray);
    //console.log(storedProcedureArray[0].split(" ")[2])
    client.queryDocuments(collectionUrl, 'SELECT * FROM quizzes q WHERE q.id = "' + id +'"').toArray((err, results) => { //we first get quiz
        if (err) { 
            console.log(err);
        }
        else {
            console.log(results[0]);
            for(var i = 0; i < storedProcedureArray.length; i++){
                var splittedArray = storedProcedureArray[i].split(" ");
                if(splittedArray[2] == "selected"){
                    var incremented = parseInt(results[0].questions[splittedArray[0]].answers[splittedArray[1]].numberOfClicks) + 1;
                    results[0].questions[splittedArray[0]].answers[splittedArray[1]].numberOfClicks = incremented.toString();
                }
            }
            
            replaceQuizDocument(results[0]);
        }
    });
}

getPublicQuizzes = function(socket){
    socket.on('getPublicQuizzes', function(data, callback) {
        client.queryDocuments(
            collectionUrl,
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
            collectionUrl,
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
            collectionUrl,
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
        let documentUrl = `${collectionUrl}/docs/${incomingMessage}`;

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
            collectionUrl,
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