const assert = require('assert');
const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');

describe('SayCmd', function() {
  describe('.spawnSync()', function() {
    it('should be undefined', function() {
      assert.equal(undefined, SayCmd.spawnSync('こんにちは世界'));
    });
  });

  describe('.spawn()', function() {
    it('should be undefined', function() {
      assert.equal(undefined, SayCmd.spawn('こんにちは世界'));
    });
  });
});
