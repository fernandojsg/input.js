function SimpleActivator (controller, button, onActivate) {
  this.lastTime = 0;
  this.timeOut = 250;
  this.eventNameDown = button + 'down';
  this.eventNameUp = button + 'up';

  this.onActivate = onActivate;

  this.onButtonDown = this.onButtonDown.bind(this);
  this.onButtonUp = this.onButtonUp.bind(this);

  controller.addBinding(button, 'down', this.onButtonDown);
  controller.addBinding(button, 'up', this.onButtonUp);
}

SimpleActivator.prototype = {
  handlePress: function (buttonState) {
    
  }
}