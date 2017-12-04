export default class LongPress {
  constructor (inputElement, onActivate) {
    this.onActivate = onActivate;

    this.onButtonDown = this.onButtonDown.bind(this);
    this.onButtonUp = this.onButtonUp.bind(this);

    inputElement.addBinding('pressdown', this.onButtonDown);
    inputElement.addBinding('pressup', this.onButtonUp);
  }

  onButtonDown (event) {
    var self = this;
    this.pressTimer = window.setTimeout(function () {
      self.onActivate();
    }, 1000);
  }
  
  updateState(controller) {
  }

  onButtonUp () {
    console.log('>>>>');
    clearTimeout(this.pressTimer);
  }
}
