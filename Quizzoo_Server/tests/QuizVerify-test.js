var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var updater = require(path.resolve(__dirname, "../QuizVerify.js"));

describe('QuizVerify', function(){

    it('genereteUUID should not generate two identical UUIDs', function(){
        expect(generateUUID()).to.not.equal(generateUUID())
    });

});