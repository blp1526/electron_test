var SayCmd = function() {
};

SayCmd.execute = function(script) {
  const spawn = require('child_process').spawn;
  spawn('say', ['-v', 'Kyoko', script]);
};

module.exports = SayCmd;
