const SayCmd = require('./src/js/renderer/SayCmd');
const Timekeeper = require('./src/js/renderer/Timekeeper');

function run() {
  const speakerName = document.getElementById("speakerName").value;
  const limitMinutes = document.getElementById("limitMinutes").value;
  const tk = new Timekeeper(speakerName, limitMinutes);
  SayCmd.execute(tk.start());
};
