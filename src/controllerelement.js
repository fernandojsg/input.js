import EventEmitter from './utils/event-emitter';

export default class ControllerElement extends EventEmitter {
  constructor (controller, name, buttonId, xAxisId, yAxisId) {
    super();

    this.controller = controller;
    this.name = name;
    this.buttonId = buttonId;
    this.xAxisId = xAxisId;
    this.yAxisId = yAxisId;

    this.previousButtonsState = null;

    this.pressed = false;
    this.touched = false;
    this.value = 0;
    this.xAxisValue = 0;
    this.yAxisValue = 0;
  }

  addBinding (activator, binding) {
    this.controller.addBinding(this.name, activator, binding);
  }

  handlePress (buttonState) {
    var evtName;

    // Not changed.
    if (buttonState.pressed === this.previousButtonState.pressed) { return false; }

    evtName = buttonState.pressed ? 'down' : 'up';
    this.emit('button' + evtName, {id: this.id, state: buttonState});
    this.previousButtonState.pressed = buttonState.pressed;
    return true;    
  }

  updateState () {
    if (!this.previousButtonState) {
      this.previousButtonState = {pressed: false, touched: false, value: 0};
    }

    var buttonState = this.controller.gamepad.buttons[this.buttonId];
    var changed = this.handlePress(buttonState);
  
    /*
    var changed = this.handlePress(id, buttonState) ||
                  this.handleTouch(id, buttonState) ||
                  this.handleValue(id, buttonState);
                  */

    if (!changed) { return false; }
    this.emit('buttonchanged', {id: this.id, state: buttonState});
    return true;    

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

