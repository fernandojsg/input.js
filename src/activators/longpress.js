export default class LongPress {
  constructor (controller, inputElement, onActivate) {
    this.onActivate = onActivate;

    this.onButtonDown = this.onButtonDown.bind(this);
    this.onButtonUp = this.onButtonUp.bind(this);

    inputElement.on('buttondown', this.onButtonDown);
    inputElement.on('buttonup', this.onButtonUp);
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
    clearTimeout(this.pressTimer);
  }
}
