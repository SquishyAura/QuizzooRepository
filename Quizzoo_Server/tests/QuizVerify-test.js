var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var updater = require(path.resolve(__dirname, "../QuizVerify.js"));

describe('QuizVerify', function(){

    it('genereteUUID should not generate two identical UUIDs', function(){
        expect(generateUUID()).to.not.equal(generateUUID())
    }); 

    it('removeEmptyElementsInArray() should clean arrays', function(){
        var array1 = [null,'my'];
        var array2 = ['Hello',null,'friend'];
        expect(removeEmptyElementsInArray(array1,array2)).to.eql(['Hello','my','friend']);
    });

});