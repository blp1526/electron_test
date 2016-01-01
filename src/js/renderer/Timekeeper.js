var Timekeeper = function(params) {
  this.speakerName    = params['speakerName'];
  this.limitMinutes   = parseInt(params['limitMinutes']);
  this.leftMinutes    = parseInt(params['leftMinutes']);
  this.limitSeconds   = this.limitMinutes * 60;
  this.currentSeconds = this.limitSeconds;
};

Timekeeper.prototype.message = function(type) {
  switch (type) {
    case 'start':
      return this.speakerName + 'さん、発表をお願いします。持ち時間は' + this.limitMinutes + '分です。';
      break;
    case 'progress':
      return '残り' + this.leftMinutes + '分です。まとめに入りましょう。';
      break;
    case 'finish':
      return '終了時間です。ありがとうございました。';
      break;
    default:
      throw new Error('Unexpected Argument');
  }
};

Timekeeper.prototype.isValid = function() {
  var self = this;
  return Object.keys(self).every(function(element, index) {
    return (self[element] ? true : false);
  });
};

module.exports = Timekeeper;
