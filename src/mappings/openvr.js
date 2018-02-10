// Hack: Because firefox shows "OpenVR Gamepad" on Microsoft MR devices
const OPENVR = {
  firefox: {
    trackpad: { button: 0, xAxis: 0, yAxis: 1 },
    trigger: 1,
    grip: 3,
    menu: 4,
    joy: { button: 2, xAxis: 2, yAxis: 3 }
  },
  chrome: {
    trackpad: { button: 0, xAxis: 0, yAxis: 1 },
    trigger: 1,
    grip: 2,
    menu: 3,
    joy: { xAxis: 2, yAxis: 3 }
  },
};

export default OPENVR;