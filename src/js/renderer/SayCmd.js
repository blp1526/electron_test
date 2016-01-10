var SayCmd = function() {
};

SayCmd.spawnSync = function(voice, script) {
  const spawnSync = require('child_process').spawnSync;
  spawnSync('say', ['-v', voice, script]);
};

SayCmd.spawn = function(voice, script) {
  const spawn = require('child_process').spawn;
  spawn('say', ['-v', voice, script]);
};

SayCmd.voiceList = function(callback) {
  var exec = require('child_process').exec;
  var command = exec("say -v ? | awk '$2 == \"en_US\" { print $1;}' ");
  var result;
  command.stdout.on('data', function(data) {
    result = data.toString().split("\n").filter(function(e) {return e !== "";});
  });
  command.on('close', function(code) {
    return callback(result);
  });
};

module.exports = SayCmd;
