const assert = require('assert');
const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');

describe('SayCmd', function() {
  describe('.spawnSync()', function() {
    it('should be undefined', function() {
      assert.equal(undefined, SayCmd.spawnSync('Ava', 'Hello World.'));
    });
  });

  describe('.spawn()', function() {
    it('should be undefined', function() {
      assert.equal(undefined, SayCmd.spawn('Ava', 'Hello World.'));
    });
  });
});
