var SayCmd = function() {
};

SayCmd.spawnSync = function(script) {
  const spawnSync = require('child_process').spawnSync;
  spawnSync('say', ['-v', 'Ava', script]);
};

SayCmd.spawn = function(script) {
  const spawn = require('child_process').spawn;
  spawn('say', ['-v', 'Ava', script]);
};

module.exports = SayCmd;
