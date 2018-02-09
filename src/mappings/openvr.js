// Hack: Because firefox shows "OpenVR Gamepad" on Microsoft MR devices
const OPENVR = {
  trackpad: { button: 0, xAxis: 0, yAxis: 1 },
  trigger: 1,
  grip: 3, // google 2 
  menu: 4, // google 3
  joy: { button: 2, xAxis: 2, yAxis: 3 } // Joy button is reserved on steam vr
};

export default OPENVR;