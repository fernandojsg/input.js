import EventEmitter from './utils/EventEmitter';

export default class Device extends EventEmitter {
  constructor () {
    super();
    this.handedness = null;
    this.id = null;
  }
}