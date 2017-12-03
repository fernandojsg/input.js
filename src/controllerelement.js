export default class ControllerElement {
  constructor(parent, name, buttonId, xAxisId, yAxisId) {
    this.parent = parent;
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

  updateState(gamepad) {
    var activator;

    if (typeof this.buttonId !== 'undefined') {
      var buttonState = gamepad.buttons[this.buttonId];

      // Not changed.
      if (buttonState.pressed !== this.pressed) {
        this.pressed = buttonState.pressed;

        this.parent.activateBinding(this.name, {
          id: this.buttonId,
          event: buttonState.pressed ? 'pressdown' : 'pressup',
          name: this.name,
          state: buttonState
        });
      }

      if (buttonState.touched !== this.touched) {
        this.touched = buttonState.touched;

        this.parent.activateBinding(this.name, {
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
      var axisValue = gamepad.axes[this.xAxisId];
      if (this.xAxisValue !== axisValue) {
        // console.log(`axis x '${this.name}' ${axisValue}`, { id: this.buttonId, event: activator, name: this.name });
        this.xAxisValue = axisValue;
      }
    }

    if (this.yAxisId) {
      var activator = 'move';
      var axisValue = gamepad.axes[this.yAxisId];
      if (this.yAxisValue !== axisValue) {
        // console.log(`axis y '${this.name}' ${axisValue}`, { id: this.buttonId, event: activator, name: this.name });
        this.yAxisValue = axisValue;
      }
    }
  }
}

