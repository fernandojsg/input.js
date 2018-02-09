import GamepadController from './gamepadcontroller';

class Controllers {
  constructor () {

    this.gamepadControllers = [];

    this.vrGamepadControllers = [];
    this.stdGamepadControllers = [];

    this.updateGamepadsList();
    this.throttledUpdateGamepadListInterval = setInterval(this.updateGamepadsList.bind(this), 5);

    this.vrDisplay = null;
    if (navigator.getVRDisplays) {
      navigator.getVRDisplays().then(function (displays) {
        if (displays.length) { self.vrDisplay = displays[0]; }
      });  
    }

    window.addEventListener('gamepadconnected', event => {
      console.info('Gamepad connected at index %d: %s. %d buttons, %d axes.',
        event.gamepad.index, event.gamepad.id,
        event.gamepad.buttons.length, event.gamepad.axes.length);
      this.updateGamepadsList();
    });

    window.addEventListener('gamepaddisconnected', function (e) {
      console.info('Gamepad disconnected from index %d: %s',
        e.gamepad.index, e.gamepad.id);
      this.updateGamepadsList();
    });

    this.loop();
  }

  loop () {
    this.poll();
    this.raf = window.requestAnimationFrame(this.loop.bind(this));
  }

  poll () {

  }

  findGamepad (gamepad) {
    for (var i = 0; i < this.gamepadControllers.length; i++) {
      var controller = this.gamepadControllers[i];
      if (controller.gamepad.id === gamepad.id) {
        return controller;
      }
    }
    return null;
  }

  updateGamepadsList () {
    var gamepads = navigator.getGamepads();
    if (!gamepads) {return;}
    
    var prevCount = this.gamepadControllers.length;
    this.vrGamepadControllers.length = 0;
    this.stdGamepadControllers.length = 0;

    for (var i = 0; i < gamepads.length; ++i) {
      var gamepad = gamepads[i];
      if (gamepad) {
        if ((gamepad.pose && gamepad.pose.hasOrientation) || gamepad.displayId) {
          this.vrGamepadControllers.push(gamepad);
        } else {
          this.stdGamepadControllers.push(gamepad);
        }
        var controller = this.findGamepad(gamepad);
        if (controller !== null) {
          controller.updateGamepad(gamepad);
        } else {
          var gamepadObj = new GamepadController(gamepad);
          this.gamepadControllers.push(gamepadObj);
        }
      }
    }
  }
}

const controllers = new Controllers();
export default controllers;
