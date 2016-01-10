const SayCmd = require(process.cwd() + '/src/js/renderer/SayCmd');
const Timekeeper = require(process.cwd() + '/src/js/renderer/Timekeeper');

SayCmd.voiceList(function(result) {
  var voiceName = document.getElementById("voiceName");
  result.forEach(function(e) {
    var option = document.createElement("option");
    option.innerText = e;
    voiceName.appendChild(option);
  });
});

document.getElementById("play").addEventListener("click", function() {
  document.getElementById("alert").innerHTML = "";
  var params = {
    speakerName:  document.getElementById("speakerName").value,
    limitMinutes: document.getElementById("limitMinutes").value
  };
  var tk = new Timekeeper(params);
  var voiceName = document.getElementById("voiceName").value;

  if (tk.isValid()) {
    SayCmd.spawnSync(voiceName, tk.message("start"));
    document.getElementById("statusBarLeft").innerHTML = tk.speakerName;
    function repetition() {
      var timeoutlId = setTimeout(repetition, 1000);
      document.getElementById("statusBarRight").innerHTML = tk.currentSeconds + " seconds left";
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
        }
      }
      tk.currentSeconds--;
    }
    repetition();
  } else {
    document.getElementById("alert").innerHTML = "Fill fields!";
  }
});

document.getElementById("stop").addEventListener('click', function() {
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
