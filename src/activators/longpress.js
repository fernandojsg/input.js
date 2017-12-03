function LongPress (gamepad, button, onActivate) {
  this.lastTime = 0;
  this.timeOut = 250;
  this.eventNameDown = button + 'down';
  this.eventNameUp = button + 'up';

  this.onActivate = onActivate;

  this.onButtonDown = this.onButtonDown.bind(this);
  this.onButtonUp = this.onButtonUp.bind(this);

  gamepad.addBinding(button, 'down', this.onButtonDown);
  gamepad.addBinding(button, 'up', this.onButtonUp);
}

LongPress.prototype = {
  onButtonDown: function (event) {
    var self = this;
    this.pressTimer = window.setTimeout(function () {
      self.onActivate();
    }, 1000);
  },

  onButtonUp: function () {
    clearTimeout(this.pressTimer);
  },

  removeListeners: function () {
  }
};

module.exports = LongPress;
