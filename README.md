# input.js

```
this.addBinding('a', 'buttondown', () => {
  console.log('button down A');
});
this.addBinding('a', 'buttonup', () => {
  console.log('button up A');
});

this.addBinding('x', 'buttonup', () => {
  console.log('button up X');
});

this.addBinding('x', 'longpress', () => {
  console.log('long press X');
});

this.addBinding('b', 'doublepress', () => {
  console.log('double press b');
});

this.addBinding('x', 'buttondown', () => {
  console.log('button down X');
});

this.addBinding('leftjoy', 'axismove', (detail) => {
  console.log('AxisMove', detail);
});
```