var SayCmd = function() {
};

SayCmd.execute = function(script) {
  const execSync = require('child_process').execSync;
  execSync('say -v Kyoko ' + script);
};

module.exports = SayCmd;
