import { CameraRig, CameraAction } from '../CameraRig';
import { KeyboardAdaptor, KeyboardAdaptorContinuousEvent } from '../adaptors/KeyboardAdaptor';
import { PointerAdaptor, PointerAdaptorEvent } from '../adaptors/PointerAdaptor';
import { WheelAdaptor, WheelAdaptorContinuousEvent } from '../adaptors/WheelAdaptor';

import { BaseControls } from './BaseControls';

/**
 * Properties that can be passed to the {@link three-story-controls#FreeMovementControls} constructor
 */
export interface FreeMovementControlsProps {
  domElement?: HTMLElement;
  /** Damping factor between 0 and 1. Defaults to 0.3 */
  pointerDampFactor?: number;
  /** Mutiplier for two-pointer translation. Defaults to 4 */
  pointerScaleFactor?: number;
  /** Damping factor between 0 and 1. Defaults to 0.5 */
  keyboardDampFactor?: number;
  /** Mutiplier for keyboard translation. Defaults to 0.5 */
  keyboardScaleFactor?: number;
  /** Damping factor between 0 and 1. Defaults to 0.25 */
  wheelDampFactor?: number;
  /** Mutiplier for wheel translation. Defaults to 0.05 */
  wheelScaleFactor?: number;
  /** Mutiplier for panning. Defaults to Math.PI / 4 */
  panDegreeFactor?: number;
  /** Mutiplier for tilting. Defaults to Math.PI / 10 */
  tiltDegreeFactor?: number;
}

/**
 * Control scheme to move the camera with arrow/WASD keys and mouse wheel; and rotate the camera with click-and-drag events.
 * @remarks
 * Control scheme to move the camera with arrow/WASD keys and mouse wheel; and rotate the camera with click-and-drag events.
 *  On a touch device, 1 finger swipe rotates the camera, and 2 fingers tranlsate/move the camera.
 *
 *
 *  Note: CSS property `touch-action: none` will probably be needed on listener element.
 *
 * See {@link three-story-controls#FreeMovementControlsProps} for all properties that can be passed to the constructor.
 *
 * {@link https://nytimes.github.io/three-story-controls/examples/demos/freemove | DEMO }
 *
 * @example
 * ```js
 * const scene = new Scene()
 * const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
 * const cameraRig = new CameraRig(camera, scene)
 * const controls = new FreeMovementControls(cameraRig)
 *
 * controls.enable()
 *
 * // render loop
 * function animate(t) {
 *  controls.update(t)
 * }
 * ```
 *
 */
export class FreeMovementControls implements BaseControls {
  readonly cameraRig: CameraRig;
  private keyboardAdaptor: KeyboardAdaptor;
  private wheelAdaptor: WheelAdaptor;
  private pointerAdaptor: PointerAdaptor;
  private readonly domElement = document.body;
  private readonly wheelScaleFactor: number = 0.05;
  private readonly pointerScaleFactor: number = 4;
  private readonly panDegreeFactor: number = Math.PI / 2;
  private readonly tiltDegreeFactor: number = Math.PI / 10;
  private pointerDampFactor = 0.3;
  private keyboardDampFactor = 0.5;
  private keyboardScaleFactor = 0.25;
  private wheelDampFactor = 0.25;

  private enabled = false;

  constructor(cameraRig: CameraRig, props: FreeMovementControlsProps = {}) {
    this.cameraRig = cameraRig;

    this.wheelScaleFactor = props.wheelScaleFactor || this.wheelScaleFactor;
    this.pointerScaleFactor = props.pointerScaleFactor || this.pointerScaleFactor;
    this.panDegreeFactor = props.panDegreeFactor || this.panDegreeFactor;
    this.tiltDegreeFactor = props.tiltDegreeFactor || this.tiltDegreeFactor;

    this.keyboardAdaptor = new KeyboardAdaptor({
      type: 'continuous',
      dampingFactor: props.keyboardDampFactor || this.keyboardDampFactor,
      incrementor: props.keyboardScaleFactor || this.keyboardScaleFactor,
    });

    this.wheelAdaptor = new WheelAdaptor({
      type: 'continuous',
      dampingFactor: props.wheelDampFactor || this.wheelDampFactor,
      domElement: props.domElement || this.domElement,
    });

    this.pointerAdaptor = new PointerAdaptor({
      domElement: props.domElement || this.domElement,
      dampingFactor: props.pointerDampFactor || this.pointerDampFactor,
    });

    this.onWheel = this.onWheel.bind(this);
    this.onKey = this.onKey.bind(this);
    this.onPointer = this.onPointer.bind(this);
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.wheelAdaptor.connect();
    this.keyboardAdaptor.connect();
    this.pointerAdaptor.connect();
    this.wheelAdaptor.addEventListener('update', this.onWheel as any);
    this.keyboardAdaptor.addEventListener('update', this.onKey as any);
    this.pointerAdaptor.addEventListener('update', this.onPointer as any);
    this.enabled = true;
  }

  disable(): void {
    this.wheelAdaptor.disconnect();
    this.keyboardAdaptor.disconnect();
    this.pointerAdaptor.disconnect();
    this.wheelAdaptor.removeEventListener('update', this.onWheel as any);
    this.keyboardAdaptor.removeEventListener('update', this.onKey as any);
    this.pointerAdaptor.removeEventListener('update', this.onPointer as any);
    this.enabled = false;
  }

  private onWheel(event: WheelAdaptorContinuousEvent): void {
    this.cameraRig.do(CameraAction.Dolly, (event.deltas.y || 0) * this.wheelScaleFactor);
    this.cameraRig.do(CameraAction.Truck, (event.deltas.x || 0) * this.wheelScaleFactor);
  }

  private onKey(event: KeyboardAdaptorContinuousEvent): void {
    this.cameraRig.do(CameraAction.Dolly, (event.values.backward || 0) - (event.values.forward || 0));
    this.cameraRig.do(CameraAction.Truck, (event.values.right || 0) - (event.values.left || 0));
    this.cameraRig.do(CameraAction.Pedestal, (event.values.up || 0) - (event.values.down || 0));
  }

  private onPointer(event: PointerAdaptorEvent): void {
    switch (event.pointerCount) {
      case 1:
        this.cameraRig.do(CameraAction.Pan, event.deltas.x * this.panDegreeFactor);
        this.cameraRig.do(CameraAction.Tilt, event.deltas.y * this.tiltDegreeFactor);
        break;
      case 2:
        this.cameraRig.do(CameraAction.Dolly, -event.deltas.y * this.pointerScaleFactor);
        this.cameraRig.do(CameraAction.Truck, -event.deltas.x * this.pointerScaleFactor);
        break;
      default:
        break;
    }
  }

  update(time: number): void {
    if (this.enabled) {
      this.keyboardAdaptor.update();
      this.wheelAdaptor.update();
      this.pointerAdaptor.update(time);
    }
  }
}
