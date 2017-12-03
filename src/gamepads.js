import Gamepad from './gamepad';

class Gamepads {
  constructor () {

    this.gamepads = [];
    this.controllers = [];

    // Loop over every gamepad and if we find any that have a pose use it.
    this.updateGamepadsList();

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
  }

  updateGamepadsList () {
    this.vrGamepads = [];
    this.stdGamepads = [];
    var gamepads = navigator.getGamepads();
    for (var i = 0; i < gamepads.length; ++i) {
      var gamepad = gamepads[i];
      if (gamepad) {
        if ((gamepad.pose && gamepad.pose.hasOrientation) || gamepad.displayId) {
          this.vrGamepads.push(gamepad);
        } else {
          this.stdGamepads.push(gamepad);
        }
        var gamepadObj = new Gamepad(gamepad);
        this.gamepads.push(gamepadObj);
      }
    }
  }
}

const gamepads = new Gamepads();
export default gamepads;
