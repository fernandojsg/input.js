var UNINPUT = {
  ACTIVATORS: {},
  CONTROLLERS: {}
};

var XBOX = {
  a: 0,
  b: 1,
  x: 2,
  y: 3,
  lb: 4,
  rb: 5,
  changeview: 6,
  menu: 7,
  leftjoy: { button: 8, xAxis: 0, yAxis: 1 },
  rightjoy: { button: 9, xAxis: 2, yAxis: 3 },
  dpadup: 10,
  dpaddown: 11,
  dpadleft: 12,
  dpadright: 13
};

class ControllerElement {
  constructor (parent, name, buttonId, xAxisId, yAxisId) {
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

  updateState (gamepad) { 
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

export default class Gamepad {
  constructor (gamepad) {
    this.gamepad = gamepad;
    this.bindings = {};

    this.elements = {};
    var ControllerMapping = XBOX;
    for (var name in ControllerMapping) {
      var element = ControllerMapping[name];
      if (typeof element === 'object') {
        this.elements[name] = new ControllerElement(this, name, element.button, element.xAxis, element.yAxis);
      } else {
        this.elements[name] = new ControllerElement(this, name, element);
      }
    }

    this.buttonStates = {};
    this.interval = setInterval(this.tick.bind(this), 5);

    this.addBinding('a', 'pressdown', () => {
      console.log('Pressing A');
    });
  }

  clearBindings () {
    this.bindings = {};
  }

  addBinding (buttonName, activator, binding) {
    if (!this.bindings[buttonName]) {
      this.bindings[buttonName] = [];
    }
    this.bindings[buttonName][activator] = binding;
  }

  handleButton (id, buttonState) {
    this.handlePress(id, buttonState);
  }

  activateBinding (buttonName, activator) {
    console.log(buttonName, activator);
    if (this.bindings[buttonName] && this.bindings[buttonName][activator]) {
      this.bindings[buttonName][activator]();
    }
  }

  detectGamepad () {
  }

  updateElements () {
    for (var name in this.elements) {
      var element = this.elements[name];
      element.updateState(this.gamepad);
    }
  }

  tick () {
    // this.updateGamepad();
    // this.updatePose();
    //this.updateButtons();
    this.updateElements();
  }

  updatePose () {

  }

  updateButtons () {
    var buttonState;
    var gamepad = this.gamepad;
    var id;

    // Check every button.
    for (id = 0; id < gamepad.buttons.length; ++id) {
      // Initialize button state.
      if (!this.buttonStates[id]) {
        this.buttonStates[id] = { pressed: false, touched: false, value: 0 };
      }

      buttonState = gamepad.buttons[id];
      this.handleButton(id, buttonState);
    }
    // Check axes.
    // this.handleAxes();
  }

  updateGamepad () {
    /*
    var data = this.data;
    var gamepad = gamepadUtils.findMatchinggamepad(
      this.system.gamepads,
      data.id,
      data.idPrefix,
      data.hand,
      data.gamepad
    );

    this.gamepad = gamepad;
    */
  }
  
}
