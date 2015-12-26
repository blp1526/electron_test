var SayCmd = function() {
};

SayCmd.spawnSync = function(script) {
  const spawnSync = require('child_process').spawnSync;
  spawnSync('say', ['-v', 'Kyoko', script]);
};

SayCmd.spawn = function(script) {
  const spawn = require('child_process').spawn;
  spawn('say', ['-v', 'Kyoko', script]);
};

module.exports = SayCmd;
