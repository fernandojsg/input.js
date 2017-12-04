export default class ControllerElement {
  constructor (controller, name, buttonId, xAxisId, yAxisId) {
    this.controller = controller;
    this.name = name;
    this.buttonId = buttonId;
    this.xAxisId = xAxisId;
    this.yAxisId = yAxisId;

    this.pressed = false;
    this.touched = false;
    this.value = 0;
    this.xAxisValue = 0;
    this.yAxisValue = 0;
  }

  addBinding (activator, binding) {
    this.controller.addBinding(this.name, activator, binding);
  }

  updateState (controller) {
    var activator;
/*Ç
    if (typeof this.buttonId !== 'undefined') {
      var buttonState = controller.buttons[this.buttonId];

      // Not changed.
      if (buttonState.pressed !== this.pressed) {
        this.pressed = buttonState.pressed;

        this.controller.activateBinding(this.name, {
          id: this.buttonId,
          event: buttonState.pressed ? 'pressdown' : 'pressup',
          name: this.name,
          state: buttonState
        });
      }

      if (buttonState.touched !== this.touched) {
        this.touched = buttonState.touched;

        this.controller.activateBinding(this.name, {
          id: this.buttonId,
          event: buttonState.touched ? 'touchdown' : 'touchup',
          name: this.name,
          state: buttonState
        });
      }
      // Value!
    }

    // Axis state
    if (this.xAxisId) {
      var activator = 'move';
      var axisValue = controller.axes[this.xAxisId];
      if (this.xAxisValue !== axisValue) {
        // console.log(`axis x '${this.name}' ${axisValue}`, { id: this.buttonId, event: activator, name: this.name });
        this.xAxisValue = axisValue;
      }
    }

    if (this.yAxisId) {
      var activator = 'move';
      var axisValue = controller.axes[this.yAxisId];
      if (this.yAxisValue !== axisValue) {
        // console.log(`axis y '${this.name}' ${axisValue}`, { id: this.buttonId, event: activator, name: this.name });
        this.yAxisValue = axisValue;
      }
    }
    */
  }
}

