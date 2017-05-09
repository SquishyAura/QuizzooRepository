var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var updater = require(path.resolve(__dirname, "../RegisterVerify.js"));

describe('RegisterVerify', function () {

    it('emptyFields() should return true if at least one of the fields are empty', function () {
        expect(emptyFields("username", "password", "")).to.equal(true);
    });

    it('invalidAmountChars() should return true if one of the fields have too few/many characters', function () {
        expect(invalidAmountChars("user", "password", "password")).to.equal(true);
    }); 

    it('passNotMatching() should return true if both passwords are not matching', function () {
        expect(passNotMatching("username", "passwor", "password")).to.equal(true);
    });

    it('usernameTaken() should return true if username is already taken', function(){
        expect(usernameTaken("username","username")).to.equal(true);
    });

});