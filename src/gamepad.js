import ControllerElement from './controllerelement';
import ControllerMappings from './mappings';
import LongPress from './activators/longpress';

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

    this.addBinding('a', 'longpress', () => {
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
    
    this.bindings[buttonName][activator].push(binding);
  }

  handleButton (id, buttonState) {
    this.handlePress(id, buttonState);
  }

  activateBinding (buttonName, activator) {
    console.log('event', buttonName, activator);

    var buttonBindings = this.bindings[buttonName];
    if (buttonBindings && buttonBindings[activator.event]) {
      for (var i = 0; i < buttonBindings[activator.event].length; i++)
        buttonBindings[activator.event][i]();
    }
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
    this.updateElements();
  }
}
