var baseText = 'input.js:';

class Logger {
  static log() {
    console.log(baseText, ...arguments);
  }

  static debug() {
    //console.info(baseText, '<debug>',...arguments);
  }
}

Logger.ALL = 0;

Logger.level = Logger.ALL;

export default Logger;