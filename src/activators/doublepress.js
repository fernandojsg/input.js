export default class DoublePress {
  constructor (controller, inputElement, onActivate) {
    this.lastTime = 0;
    this.timeOut = 250;
    this.eventName = 'buttondown';
    this.onActivate = onActivate;
    this.inputElement = inputElement;

    this.onButtonDown = this.onButtonDown.bind(this);

    inputElement.on(this.eventName, this.onButtonDown);
  }
  
  onButtonDown (event) {
    var time = performance.now();
    if (time - this.lastTime < this.timeOut) {
      this.onActivate(event.detail);
    } else {
      this.lastTime = time;
    }
  }

  removeListeners () {
    this.inputElement.off(this.eventName, this.onButtonDown);
  }
}
