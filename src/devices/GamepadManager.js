import Gamepad from './Gamepad';

export default class GamepadManager {
  constructor () {

    this.gamepadDevices = [];

    this.vrGamepadDevices = [];
    this.stdGamepadDevices = [];

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
    for (var i = 0; i < this.gamepadDevices.length; i++) {
      var controller = this.gamepadDevices[i];
      if (controller.gamepad.id === gamepad.id) {
        return controller;
      }
    }
    return null;
  }

  updateGamepadsList () {
    var gamepads = navigator.getGamepads();
    if (!gamepads) {return;}
    
    var prevCount = this.gamepadDevices.length;
    this.vrGamepadDevices.length = 0;
    this.stdGamepadDevices.length = 0;

    for (var i = 0; i < gamepads.length; ++i) {
      var gamepad = gamepads[i];
      if (gamepad) {
        if ((gamepad.pose && gamepad.pose.hasOrientation) || gamepad.displayId) {
          this.vrGamepadDevices.push(gamepad);
        } else {
          gamepad.hasOrientation = gamepad.hasPosition = false;
          this.stdGamepadDevices.push(gamepad);
        }

        var controller = this.findGamepad(gamepad);
        if (controller !== null) {
          controller.updateGamepad(gamepad);
        } else {
          var gamepadObj = new Gamepad(gamepad);
          this.gamepadDevices.push(gamepadObj);
        }
      }
    }
  }
}
