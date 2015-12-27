const assert = require('assert');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');

describe('new Timekeeper("名無し", 10)', function() {
  const tk = new Timekeeper('名無し', 10);

  describe('#start()', function() {
    it('should be "名無しさん、発表をお願いします。持ち時間は10分です。"', function() {
      assert.equal(tk.start(), '名無しさん、発表をお願いします。持ち時間は10分です。');
    });
  });

  describe('#progress(5)', function() {
    it('should be "残り5分です。まとめに入りましょう。"', function() {
      assert.equal(tk.progress(5), '残り5分です。まとめに入りましょう。');
    });
  });

  describe('#finish()', function() {
    it('should be "終了時間です。ありがとうございました。"', function() {
      assert.equal(tk.finish(), '終了時間です。ありがとうございました。');
    });
  });
});
