export default class SimpleActivator {
    /**
     * 
     * @param {*} inputElement 
     * @param {*} event [pressdown, buttonup]
     * @param {*} onActivate 
     */
    constructor (controller, inputElement, eventName, onActivate) {
      this.inputElement = inputElement;
      this.onActivate = onActivate;
      this.eventName = eventName;
  
      inputElement.on(eventName, onActivate);
    }
  }
  