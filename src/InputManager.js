import GamepadManager from './devices/GamepadManager';

export default class InputManager {
  constructor () {
    this.devices = [];
    this.gamepadManager = new GamepadManager();
  }

  // @todo Promise
  getDevices () {
    return new Promise((resolve, reject) => {
      resolve(this.gamepadManager.gamepadDevices);
    });
  }
}