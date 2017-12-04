import ControllerElement from './controllerelement';
import ControllerMappings from './mappings';
import LongPress from './activators/longpress';

class SimpleActivator {
  constructor (inputElement, onActivate) {
    this.inputElement = inputElement;
    this.onActivate = onActivate;
  }

  updateState (controller) {
    var activator;
    var buttonState = controller.gamepad.buttons[this.inputElement.buttonId];

    // Not changed.
    if (buttonState.pressed !== this.inputElement.pressed) {
      this.inputElement.pressed = buttonState.pressed;
      console.log('Pressed');
/*
      this.controller.activateBinding(this.name, {
        id: this.buttonId,
        event: buttonState.pressed ? 'pressdown' : 'pressup',
        name: this.name,
        state: buttonState
      });
*/      
    }    
  }
}


export default class Gamepad {
  constructor (gamepad) {
    this.gamepad = gamepad;
    this.bindings = {};

    // Build elements based on the controller
    // @todo Detect this one
    var ControllerMapping = ControllerMappings.xbox;

    this.elements = {};
    
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

    // Test
    this.addBinding('a', 'pressdown', () => {
      console.log('Pressing A');
    });

    this.addBinding('x', 'longpress', () => {
      console.log('Long press');
    });
  }

  clearBindings () {
    this.bindings = {};
  }

  addBinding (buttonName, activator, binding) {
    if (!this.bindings[buttonName]) {
      this.bindings[buttonName] = [];
    }

    if (!this.bindings[buttonName][activator]) {
      this.bindings[buttonName][activator] = [];
    }
    
    var Activators = {
      //'pressdown': PressDown,
      'longpress': LongPress
    };

    if (activator === 'longpress') {
      this.bindings[buttonName][activator].push(new LongPress(this.elements[buttonName], binding));
    } else if (activator === 'pressdown') {
      this.bindings[buttonName][activator].push(new SimpleActivator(this.elements[buttonName], binding));
    }
  }

  handleButton (id, buttonState) {
    this.handlePress(id, buttonState);
  }

  activateBinding (buttonName, activator) {
    /*
    console.log('event', buttonName, activator);

    var buttonBindings = this.bindings[buttonName];
    if (buttonBindings && buttonBindings[activator.event]) {
      for (var i = 0; i < buttonBindings[activator.event].length; i++)
        buttonBindings[activator.event][i]();
    }
    */
  }

  updateElements () {
    for (var name in this.elements) {
      var element = this.elements[name];
      element.updateState(this.gamepad);
      for (var activatorName in this.bindings[name]) {
        var activators = this.bindings[name][activatorName];
        for (var i=0;i< activators.length; i++) {
          activators[i].updateState(this);
        }
      }
    }
  }

  tick () {
    // this.updateGamepad();
    // this.updatePose();
    this.updateElements();
  }
}
