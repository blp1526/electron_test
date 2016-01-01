const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');

document.getElementById("run").addEventListener('click', function() {
  document.getElementById("alert").innerHTML = "";

  var params = {
    speakerName:  document.getElementById("speakerName").value,
    limitMinutes: document.getElementById("limitMinutes").value
  }
  var tk = new Timekeeper(params);

  if (tk.isValid()) {
    SayCmd.spawnSync(tk.message("start"));
    function repetition() {
      var timeoutlId = setTimeout(repetition, 1000);
      document.getElementById("currentSeconds").innerHTML = tk.currentSeconds + " seconds left";
      if (tk.currentSeconds !== tk.limitSeconds) {
        if (tk.currentSeconds % 60 === 0) {
          tk.leftMinutes--;
        }
        if (tk.currentSeconds === 180) {
          SayCmd.spawn(tk.message("progress"));
        }
        if (tk.currentSeconds < 1) {
          SayCmd.spawn(tk.message("finish"));
          clearTimeout(timeoutlId);
        }
      }
      tk.currentSeconds--;
    }
    repetition();
  } else {
    document.getElementById("alert").innerHTML = "Fill fields!";
  }
});
