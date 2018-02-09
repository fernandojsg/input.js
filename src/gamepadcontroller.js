import ControllerElement from './controllerelement';
import ControllerMappings from './mappings';
import DoublePress from './activators/doublepress';
import LongPress from './activators/longpress';
import SimpleActivator from './activators/simpleactivator';
import EventEmitter from './utils/event-emitter';

export default class GamepadController extends EventEmitter {
  updateGamepad (gamepad) {
    this.gamepad = gamepad;
  }

  constructor (gamepad) {
    super();

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

    this.interval = setInterval(this.tick.bind(this), 5);

    // Test
    this.addBinding('a', 'buttondown', () => {
      console.log('button down A');
    });
    this.addBinding('a', 'buttonup', () => {
      console.log('button up A');
    });

    this.addBinding('x', 'buttonup', () => {
      console.log('button up X');
    });

    this.addBinding('x', 'longpress', () => {
      console.log('long press X');
    });

    this.addBinding('b', 'doublepress', () => {
      console.log('double press b');
    });

    this.addBinding('x', 'buttondown', () => {
      console.log('button down X');
    });

    this.addBinding('leftjoy', 'axismove', (detail) => {
      console.log('AxisMove', detail);
    });
  }

  clearBindings () {
    this.bindings = {};
  }

  addBinding (buttonName, activatorName, binding) {
    if (!this.bindings[buttonName]) {
      this.bindings[buttonName] = {};
    }

    if (activatorName === 'longpress') {
      this.bindings[buttonName][activatorName] = new LongPress(this, this.elements[buttonName], binding);
    } else if (activatorName === 'doublepress') {
      this.bindings[buttonName][activatorName] = new DoublePress(this, this.elements[buttonName], binding);
    } else if (activatorName === 'buttondown' || activatorName === 'buttonup' || activatorName === 'axismove') {
      this.bindings[buttonName][activatorName] = new SimpleActivator(this, this.elements[buttonName], activatorName, binding);
    }
  }

  updateElements () {
    for (var elName in this.elements) {
      var element = this.elements[elName];
      element.updateState();
    }
  }

  tick () {
    // this.updatePose();
    this.updateElements();
  }
}
