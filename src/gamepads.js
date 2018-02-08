import Gamepad from './gamepad';

class Gamepads {
  constructor () {

    this.gamepads = [];
    this.gamepad = [];

    this.vrGamepads = [];
    this.stdGamepads = [];

    this.updateGamepadsList();
    this.throttledUpdateGamepadListInterval = setInterval(this.updateGamepadsList.bind(this), 5);

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
    for (var i = 0; i < this.gamepads.length; i++) {
      var controller = this.gamepads[i];
      if (controller.gamepad.id === gamepad.id) {
        return controller;
      }
    }
    return null;
  }

  updateGamepadsList () {
    var gamepads = navigator.getGamepads();
    if (!gamepads) {return;}
    
    var prevCount = this.gamepads.length;
    this.vrGamepads.length = 0;
    this.stdGamepads.length = 0;

    for (var i = 0; i < gamepads.length; ++i) {
      var gamepad = gamepads[i];
      if (gamepad) {
        if ((gamepad.pose && gamepad.pose.hasOrientation) || gamepad.displayId) {
          this.vrGamepads.push(gamepad);
        } else {
          this.stdGamepads.push(gamepad);
        }
        var controller = this.findGamepad(gamepad);
        if (controller !== null) {
          controller.updateGamepad(gamepad);
        } else {
          var gamepadObj = new Gamepad(gamepad);
          this.gamepads.push(gamepadObj);
        }
      }
    }
  }
}

const gamepads = new Gamepads();
export default gamepads;
