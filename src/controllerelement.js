import EventEmitter from './utils/event-emitter';
import Logger from './utils/logger';

export default class ControllerElement extends EventEmitter {
  constructor (controller, name, buttonId, xAxisId, yAxisId) {
    super();

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

    this.axisMoveEventDetail = {};
    if (typeof xAxisId !== 'undefined') { 
      this.axisMoveEventDetail.x = 0; 
      this.axisMoveEventDetail.xChanged = false;
    }
    if (typeof yAxisId !== 'undefined') { 
      this.axisMoveEventDetail.y = 0; 
      this.axisMoveEventDetail.yChanged = false;
    }
  }

  addBinding (activator, binding) {
    this.controller.addBinding(this.name, activator, binding);
  }

  handleAxes () {
    var changed = false;
    var controllerAxes = this.controller.axes;
    var i;
    var previousAxis = this.axis;
    var changed = false;

    if (typeof this.xAxisId !== 'undefined') {
      var xAxisValue = this.controller.gamepad.axes[this.xAxisId];
      if (xAxisValue !== this.xAxisValue) {
        Logger.debug('x axis', xAxisValue);
        this.axisMoveEventDetail.x = this.xAxisValue = xAxisValue;
        this.axisMoveEventDetail.xChanged = changed = true;
      }
    }

    if (typeof this.yAxisId !== 'undefined') {
      var yAxisValue = this.controller.gamepad.axes[this.yAxisId];
      if (yAxisValue !== this.yAxisValue) {
        Logger.debug('y axis', yAxisValue);
        this.axisMoveEventDetail.y = this.yAxisValue = yAxisValue;
        this.axisMoveEventDetail.yChanged = changed = true;
      }
    }

    if (!changed) { return false };

    Logger.debug(this.axisMoveEventDetail);
    this.emit('axismove', this.axisMoveEventDetail);
    return true;
  }

  handlePress (buttonState) {
    if (buttonState.pressed === this.pressed) { return false; }

    var evtName = buttonState.pressed ? 'down' : 'up';
    Logger.debug(this.name, 'press', evtName);
    this.emit('button' + evtName, {id: this.id, state: buttonState});
    
    this.pressed = buttonState.pressed;
    return true;    
  }

  handleValue (buttonState) {
    if (buttonState.value === this.value) { return false; }

    this.value = buttonState.value;
    return true;
  }

  handleTouch (buttonState) {
    if (buttonState.touched === this.touched) { return false; }

    var evtName = buttonState.touched ? 'start' : 'end';
    // Due to unfortunate name collision, add empty touches array to avoid Daydream error.
    this.emit('touch' + evtName, {id: this.id, state: buttonState}, true, {touches: []});
    this.touched = buttonState.touched;
    return true;
  }

  updateState () {
    var buttonState = this.controller.gamepad.buttons[this.buttonId];

    this.handleAxes();

    var press = this.handlePress(buttonState);
    var value = this.handleValue(buttonState);
    var touch = this.handleTouch(buttonState);
    var changed = press || value || touch;
    
    if (!changed) { return false; }
    Logger.debug(this.name, 'changed', buttonState.pressed, buttonState.value);
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

