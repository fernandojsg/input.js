
class VRInputSource {

}

class VRControllerMesh {
  requestBuffer() {

  }
}

class VRInputPose {
  constructor() {
    this.gripPoseMatrix;
    this.pointerPoseMatrix;
  }
}

class VRController extends VRInputSource {
  init() {
    this.handedNess = 'left';
    this.supportsPointing = false;
    this.supportsGrabbing = false;
    this.elements = [];
    this.mesh = new VRControllerMesh();
  }
}

class VRControllerElement {
  constructor(buttonId, xAxisId, yAxisId) {
    this.button = button;

    this.pressed = false;
    this.touched = false;
    this.value = 0;
    this.xAxis = 0;
    this.yAxis = 0;
  }
}
