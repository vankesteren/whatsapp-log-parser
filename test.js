'use strict';

var assert = require('assert');

var whatsappLogParser = require('./');

describe('whatsappLogParser full parse', function(){
  var actual;

  beforeEach(function(done) {
    whatsappLogParser('tests/expected.txt', function(err, results){
      actual = results;

      done();
    });
  });

  it('should have the correct amount of messages', function() {
    assert(actual.length);
    assert.equal(actual.length, 5);
  });

  it('should have a valid date', function() {
    // remove timezone(+08:00) from datetimestamp
    var date = actual[0].date.split('');
    date.splice(19, 6);
    date = date.join('');

    assert.equal(date, '2014-02-27T05:16:12');
  });

  it('should have correct boolean for announcements', function() {
    assert(actual[0].announcement);
    assert(!actual[3].announcement);
  });

  it('should have correct sender for messages', function() {
    assert(!actual[0].sender);
    assert.equal(actual[3].sender, 'Steve Rogers');
  });

  it('should have correct message for messages', function() {
    assert.equal(actual[3].message, 'We won.');
  });
});
