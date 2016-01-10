var pluralize = require('pluralize')

var Timekeeper = function(params) {
  this.speakerName    = params['speakerName'];
  this.limitMinutes   = parseInt(params['limitMinutes']);
  this.leftMinutes    = this.limitMinutes;
  this.limitSeconds   = this.limitMinutes * 60;
  this.currentSeconds = this.limitSeconds;
};

Timekeeper.prototype.message = function(type) {
  switch (type) {
    case 'start':
      return `${this.speakerName}. Time limit is ${this.limitMinutes} ${pluralize("minute", this.limitMinutes)}. Start!`;
      break;
    case 'progress':
      return `The remaining time is ${this.leftMinutes} ${pluralize("minute", this.leftMinutes)}.`;
      break;
    case 'finish':
      return "Time is over. Thank you for your speach.";
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
