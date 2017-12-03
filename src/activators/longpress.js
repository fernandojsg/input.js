export default class LongPress {
  constructor (gamepad, button, onActivate) {
    this.lastTime = 0;
    this.timeOut = 250;

    this.onActivate = onActivate;

    this.onButtonDown = this.onButtonDown.bind(this);
    this.onButtonUp = this.onButtonUp.bind(this);

    gamepad.addBinding('a', 'pressdown', this.onButtonDown);
    gamepad.addBinding('a', 'pressup', this.onButtonUp);
  }

  onButtonDown (event) {
    var self = this;
    this.pressTimer = window.setTimeout(function () {
      self.onActivate();
    }, 1000);
  }

  onButtonUp () {
    clearTimeout(this.pressTimer);
  }
}
