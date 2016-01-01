const assert = require('assert');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');

describe('Timekeeper', function() {
  var params = { speakerName: 'nanashi', limitMinutes: '10' };
  var tk = new Timekeeper(params);

  describe('.prototype.message()', function() {
    context('when type is "start"', function() {
      it('should be "${this.speakerName}さん、発表をお願いします。持ち時間は10分です。"', function() {
        assert.equal(tk.message('start'), 'nanashiさん、発表をお願いします。持ち時間は10分です。');
      });
    });
    context('when type is "progress"', function() {
      it('should be "残り${this.leftMinutes}分です。まとめに入りましょう。"', function() {
        assert.equal(tk.message('progress'), '残り10分です。まとめに入りましょう。');
      });
    });
    context('when type is "finish"', function() {
      it('should be "終了時間です。ありがとうございました。"', function() {
        assert.equal(tk.message("finish"), '終了時間です。ありがとうございました。');
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
