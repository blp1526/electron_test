const Timekeeper = function(speakerName, limitMinutes) {
  this.speakerName = speakerName;
  this.limitMinutes = limitMinutes;
};

Timekeeper.prototype.start = function() {
  return this.speakerName + 'さん、発表をお願いします。持ち時間は' + this.limitMinutes + '分です。';
};

Timekeeper.prototype.progress = function(passedMinutes) {
  return '残り' + (this.limitMinutes - passedMinutes) + '分です。'
};

Timekeeper.prototype.finish = function() {
  return '終了時間です。ありがとうございました。';
};

module.exports = Timekeeper;
