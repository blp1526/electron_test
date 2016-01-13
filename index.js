const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');
const pluralize = require('pluralize');
var timeoutlId;

SayCmd.voiceList(function(result) {
  var voiceName = document.getElementById("voiceName");
  result.forEach(function(e) {
    var option = document.createElement("option");
    option.innerText = e;
    if (e === "Ava") {
      option.selected = true;
    }
    voiceName.appendChild(option);
  });
});

document.getElementById("play").addEventListener("click", function() {
  document.getElementById("alert").innerText = "";
  var params = {
    speakerName:  document.getElementById("speakerName").value,
    limitMinutes: document.getElementById("limitMinutes").value
  };
  var tk = new Timekeeper(params);
  var voiceName = document.getElementById("voiceName").value;

  if (tk.isValid()) {
    document.getElementById("play").disabled = true;
    document.getElementById("stop").disabled = false;
    SayCmd.spawnSync(voiceName, tk.message("start"));
    document.getElementById("statusBarLeft").innerText = tk.speakerName;
    function repetition() {
      timeoutlId = setTimeout(repetition, 1000);
      var minutes = ("0" + parseInt(tk.currentSeconds / 60)).substr(-2);
      var seconds = ("0" + (tk.currentSeconds - (60 * minutes))).substr(-2);
      document.getElementById("statusBarRight").innerText = `${minutes}:${seconds}`;
      if (tk.currentSeconds !== tk.limitSeconds) {
        if (tk.currentSeconds % 60 === 0) {
          tk.leftMinutes--;
        }
        if (tk.currentSeconds === 60) {
          SayCmd.spawn(voiceName, tk.message("progress"));
        }
        if (tk.currentSeconds < 1) {
          SayCmd.spawn(voiceName, tk.message("finish"));
          clearTimeout(timeoutlId);
          document.getElementById("stop").disabled = true;
          document.getElementById("play").disabled = false;
          document.getElementById("statusBarLeft").innerText = "";
          document.getElementById("statusBarRight").innerText = "";
        }
      }
      tk.currentSeconds--;
    }
    repetition();
  } else {
    document.getElementById("alert").innerText = "Fill fields!";
  }
});

document.getElementById("stop").addEventListener('click', function() {
  clearTimeout(timeoutlId);
  document.getElementById("stop").disabled = true;
  document.getElementById("play").disabled = false;
  document.getElementById("statusBarLeft").innerText = "";
  document.getElementById("statusBarRight").innerText = "";
});

var activate = function() {
  var elements =  document.querySelectorAll(".list-group-item");
  for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      for(var j = 0; j < elements.length; j++) {
        elements[j].classList.remove("active");
      }
      this.classList.add("active");
      document.getElementById("speakerName").value = this.querySelector('.speaker-name').innerText;
      document.getElementById("limitMinutes").value = this.querySelector('.limit-minutes').innerText;
    });
  }
};
activate();

document.getElementById("speakerName").addEventListener("keyup", function() {
  const activeSpeakerName = document.querySelector(".active .speaker-name");
  if (activeSpeakerName.innerText != this.value) {
    activeSpeakerName.innerText = this.value;
  }
});

document.getElementById("limitMinutes").addEventListener("keyup", function() {
  const activeLimitMinutes = document.querySelector(".active .limit-minutes");
  if (activeLimitMinutes.innerText != this.value) {
    activeLimitMinutes.innerText = this.value;
  }
});

document.getElementById("add-button").addEventListener("click", function() {
  var cloneList = document.querySelectorAll(".list-group-item")[0].cloneNode(true);
  cloneList.classList.remove("active");
  cloneList.querySelector(".speaker-name").innerText = "";
  cloneList.querySelector(".limit-minutes").innerText = "";
  document.getElementById("addable-list-group").appendChild(cloneList);
  document.getElementById("delete-button").classList.remove("undisplay");
  activate();
});

document.getElementById("delete-button").addEventListener("click", function() {
  var activeList = document.querySelector(".active");
  activeList.parentNode.removeChild(activeList);
  document.querySelectorAll(".list-group-item")[0].classList.add("active");
  if (document.querySelectorAll(".list-group-item").length === 1) {
    document.getElementById("delete-button").classList.add("undisplay");
  }
});
