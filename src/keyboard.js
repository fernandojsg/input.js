export default class Keyboard {
  constructor () {
    console.log('qwerqwer');
    window.addEventListener('keydown', evt => {
      console.log('keydown');
    });
    window.addEventListener('keyup', evt => {
      console.log('keyup');
    });
  }
}
