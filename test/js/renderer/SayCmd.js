const assert = require('assert');
const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');

describe('SayCmd', function() {
  describe('.execute("こんにちは世界")', function() {
    it('should be undefined', function() {
      assert.equal(undefined, SayCmd.execute('こんにちは世界'));
    });
  });
});
