import ControllerElement from './ControllerElement';
import ControllerMappings from '../mappings';
import DoublePress from '../activators/DoublePress';
import LongPress from '../activators/LongPress';
import SimpleActivator from '../activators/SimpleActivator';
import { detect } from 'detect-browser';
import Device from '../Device';

export default class Gamepad extends Device {
  updateGamepad (gamepad) {
    this.gamepad = gamepad;
  }

  detectGamepadById (id) {
    if (id.indexOf('Xbox Wireless Controller') !== -1 || id.indexOf('Xbox 360 Controller') !== -1) {
      return 'xbox';
    }
    else if (id.indexOf('OpenVR Gamepad') !== -1) {
      return 'openvr';
    }
    return false;
  }

  constructor (gamepad) {
    super();

    this.gamepad = gamepad;
    this.bindings = {};

    // Build elements based on the controller
    var gamepadModel = this.detectGamepadById(gamepad.id);
    if (gamepadModel === false) {
      console.warn(`Gamepad with id: "${gamepad.id}" can't be identified.`);
      return;
    }

    this.id = gamepad.id;
    this.model = gamepadModel;
    this.type = 'gamepad';
    
    var browser = detect();
    var ControllerMapping = ControllerMappings[gamepadModel][browser.name] ? 
      ControllerMappings[gamepadModel][browser.name] : ControllerMappings[gamepadModel].firefox;

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
/*
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
    */
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
