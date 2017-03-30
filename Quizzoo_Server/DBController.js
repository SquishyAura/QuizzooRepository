var sql = require('mssql');

/*var dbConfig = {
    server: "localhost",
    database: "QuizzooDB",
    user: "quizzoouser",
    password: "quizzoopass",
    port: 1433 //default port for microsoft sql server
};*/

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'QUIZZOOADMIN',
    password: 'Admin123',
    server: 'quizzoo.database.windows.net',
    options: {encrypt: true, database: 'Quizzoo'}
}

var connection = new Connection(config);

connection.on('connect', function(err) {
    if(err){
        console.log(err);
    }
    else
    {
        console.log("Connected to database.");
    }
})

/*
* ADD TO DATABASE
*/
addAccountToDB = function(username, password) { //Add account to Database
    var connection = new Connection(config);

    connection.connect().then(function () {
        var request = new Request(connection);
        request.query("INSERT INTO [dbo].[Accounts] (Username, Password) VALUES ('" + username + "', '" + password + "')").then(function (recordset) {
            console.log(recordset);
            connection.close();
        }).catch(function (err) {
            console.log(err);
            connection.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}

createAccountsTableIfNotExists = function(){
    request = new Request("IF NOT EXISTS ( SELECT * FROM sys.tables t INNER JOIN sys.schemas s on t.schema_id = s.schema_id WHERE s.name = 'dbo' and t.name = 'Accounts' ) BEGIN CREATE TABLE Accounts (ID int NOT NULL IDENTITY(1,1) PRIMARY KEY, Username nchar(20) NOT NULL, Password nchar(20) NOT NULL) END", function(err) {
        if(err){
            console.log(err);
        }
    });
    connection.execSql(request);
}

/*
* GET FROM DATABASE
*/
getAccounts = function(){ //Get all accounts
    request = new Request("SELECT * FROM Accounts", function(err, callback){
        console.log(err);
    });

    /*var connection = new Connection(config);

    connection.connect().then(function () {
        var request = new Request(connection);
        request.query("SELECT * FROM [dbo].[Accounts]").then(function (recordset) {
            console.log(recordset);
            connection.close();
        }).catch(function (err) {
            console.log(err);
            connection.close();
        });
    }).catch(function (err) {
        console.log(err);
    });*/
}

register = function(username, password, socket){ //Check if username exists in db. If not, register user.
    var connection = new Connection(config);

    connection.connect().then(function () { 
        var request = new Request(connection);
        request.query("SELECT TOP 1 Username FROM [dbo].[Accounts] WHERE Username = '" + username + "'").then(function (recordset) {
            //if username exists in db, user can not register
            recordset[0].Username; //den her linje skal være her ellers virke det ikke
            var usernameTaken = true;
            var usernameError = {
                usernameTaken: usernameTaken
            }
            socket.emit('registerError', JSON.stringify(usernameError));
            connection.close();
        }).catch(function (err) {
            //if username doesn't exist in db, user can register
            addAccountToDB(username, password);
            //getAccounts();
            var correctRegister = true;
			var registerSuccess = {
				correctRegister: correctRegister
			}	
			socket.emit('registerError', JSON.stringify(registerSuccess));
            //query error
            console.log(err);
            connection.close();
        });
    }).catch(function (err) {
        //connection to database error
        console.log(err);
    });
}

login = function(username, password, socket){ //Check if username & password exist in db. If they do, log user in.
    var connection = new Connection(config);

    connection.connect().then(function () { 
        var request = new Request(connection);
        request.query("SELECT TOP 1 Username, Password FROM [dbo].[Accounts] WHERE Username = '" + username + "' AND Password = '" + password + "'").then(function (recordset) {
            //if username exists in db, user can log in
            console.log(username + password + recordset[0].Username + recordset[0].Password); //den her linje skal være her ellers virke det ikke
            var correctAccount = true;
			var accountSuccess = {
				correctAccount: correctAccount,
                username: username
			}	
			socket.emit('loginSuccess', JSON.stringify(accountSuccess));
            connection.close();
        }).catch(function (err) {
            //if username doesn't exist in db, user cannot log in
            var incorrectAccount = true;
            var accountError = {
                incorrectAccount: incorrectAccount
            }
            socket.emit('loginError', JSON.stringify(accountError));
            //query error
            console.log(err);
            connection.close();
        });
    }).catch(function (err) {
        //connection to database error
        console.log(err);
    });
}

/*
* DELETE FROM DATABASE
*/
restartAccountsTable = function(){
    var connection = new Connection(config);

    connection.connect().then(function () {
        var request = new Request(connection);
        request.query("DROP TABLE [dbo].[Accounts]").then(function (recordset) {
            createAccountsTable();
            console.log(recordset);
            connection.close();
        }).catch(function (err) {
            console.log(err);
            connection.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}