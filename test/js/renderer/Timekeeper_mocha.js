const assert = require('assert');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');

describe('Timekeeper', function() {
  var params = { speakerName: 'Nanashi', limitMinutes: '10' };
  var tk = new Timekeeper(params);

  describe('.prototype.message()', function() {
    context('when type is "start"', function() {
      it('should be `${this.speakerName}. Time limit is ${this.limitMinutes} ${pluralize("minute", this.limitMinutes)}. Start!`', function() {
        assert.equal(tk.message('start'), 'Nanashi. Time limit is 10 minutes. Start!');
      });
    });
    context('when type is "progress"', function() {
      it('should be `The remaining time is ${this.leftMinutes} ${pluralize("minute", this.leftMinutes)}.`', function() {
        assert.equal(tk.message('progress'), 'The remaining time is 10 minutes.');
      });
    });
    context('when type is "finish"', function() {
      it('should be "Time is over. Thank you for your speach."', function() {
        assert.equal(tk.message("finish"), "Time is over. Thank you for your speach.");
      });
    });
  });

  describe('.prototype.isValid()', function() {
    context('when all attrs are evaluated as truthy', function() {
      it('should be true', function() {
        assert.equal(tk.isValid(), true);
      });
    });
    context('when some attrs are evaluated as falsy (null, undefined, NaN, "", 0, false)', function() {
      it('should be false', function() {
        tk.speakerName = '';
        assert.equal(tk.isValid(), false);
      });
    });
  });
});
