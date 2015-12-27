const SayCmd = require('./src/js/renderer/SayCmd');
const Timekeeper = require('./src/js/renderer/Timekeeper');

function run() {
  const speakerName = document.getElementById("speakerName").value;
  const limitMinutes = document.getElementById("limitMinutes").value;
  const tk = new Timekeeper(speakerName, limitMinutes);

  var limitSeconds = parseInt(limitMinutes) * 60;
  var currentSeconds = limitSeconds;

  SayCmd.spawnSync(tk.start());

  function repetition() {
    var timeoutlId = setTimeout(repetition, 1000);
    document.getElementById("currentSeconds").innerHTML = currentSeconds + " seconds left";
    if (currentSeconds < 1) {
      SayCmd.spawn(tk.finish());
      clearTimeout(timeoutlId);
    } else if ((currentSeconds != limitSeconds) && (currentSeconds == 180)) {
      SayCmd.spawn(tk.progress(3));
    }
    currentSeconds--;
  }
  repetition();
}
