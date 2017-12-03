export default class Keyboard {
  constructor () {
    window.addEventListener('keydown', evt => {
      console.log('keydown');
    });
    window.addEventListener('keyup', evt => {
      console.log('keyup');
    });
  }
}
