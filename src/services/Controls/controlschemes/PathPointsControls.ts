import { EventDispatcher } from 'three';

import { CameraRig } from '../CameraRig';
import { KeyboardAdaptor, KeyboardAdaptorDiscreteEvent } from '../adaptors/KeyboardAdaptor';
import { WheelAdaptor } from '../adaptors/WheelAdaptor';
import { SwipeAdaptor, SwipeAdaptorEvent } from '../adaptors/SwipeAdaptor';

import { BaseControls, UpdatePOIsEvent, ExitPOIsEvent } from './BaseControls';

export interface PathPointMarker {
  frame: number;
}

/**
 * Properties that can be passed to the {@link three-story-controls#PathPointsControls} constructor
 */
export interface PathPointsControlsProps {
  /** Threshold of wheel delta that triggers a transition. Defaults to 15 */
  wheelThreshold?: number;
  /** Threshold of swipe distance that triggers a transition. Defaults to 60 */
  swipeThreshold?: number;
  /** Transition duration, defaults to 1 */
  duration?: number;
  /** Transition easing, defaults to power1 */
  ease?: string;
  /** Use keyboard arrow keys as navigation, defaults to true */
  useKeyboard?: boolean;
}

const defaultProps: PathPointsControlsProps = {
  wheelThreshold: 15,
  swipeThreshold: 60,
  duration: 1,
  ease: 'power1',
  useKeyboard: true,
};

/**
 * Control scheme to transition the camera between specific points (frames) along a path specified through an `AnimationClip`.
 * @remarks
 * Control scheme to transition the camera between specific points (frames) along a path specified through an `AnimationClip`.
 *  A mouse wheel or swipe or keyboard arrow event triggers the camera to smoothly transition from one given frame number to the next.
 *
 *
 * Note: CSS property `touch-action: none` will probably be needed on listener element.
 *
 * See {@link three-story-controls#PathPointsControlsProps} for all properties that can be passed to the constructor.
 *
 * See {@link three-story-controls#PathPointMarker} for POI properties.
 *
 * See {@link three-story-controls#UpdatePOIsEvent} and {@link three-story-controls#ExitPOIsEvent} for emitted event signatures.
 *
 * {@link https://nytimes.github.io/three-story-controls/examples/demos/path-points/ | DEMO }
 * @example
 * ```js
 *
 * const pois = [ { frame: 0 }, { frame: 54 } ....]
 * const scene = new Scene()
 * const gltfLoader = new GLTFLoader()
 * let camera, cameraRig, controls
 *
 * gltfLoader.load(cameraPath, (gltf) => {
 *  camera = gltf.cameras[0]
 *  cameraRig = new CameraRig(camera, scene)
 *  cameraRig.setAnimationClip(gltf.animations[0])
 *  cameraRig.setAnimationTime(0)
 *  controls = new PathPointsControls(cameraRig, pois)
 *  controls.enable()
 *  controls.addEventListener('ExitPOIs', (e) => {
 *    // e.exitFrom will be either 'start' or 'end'
 *  })
 *  controls.addEventListener('update', (e) => {
 *    // e.currentIndex will be the index of the starting poi
 *    // e.upcomingIndex will be the index of the upcoming poi
 *    // e.progress will be a number 0-1 indicating progress of the transition
 *  })
 * })
 * ```
 */
export class PathPointsControls extends EventDispatcher implements BaseControls {
  readonly cameraRig: CameraRig;
  private wheelAdaptor: WheelAdaptor;
  private swipeAdaptor: SwipeAdaptor;
  private keyboardAdaptor?: KeyboardAdaptor;
  private pois: PathPointMarker[];
  private currentIndex: number | null = null;
  private upcomingIndex: number | null = null;
  private enabled = false;
  private duration = 1;
  private ease = 'power1';
  private wheelThreshold = 15;
  private swipeThreshold = 60;
  private useKeyboard = true;

  constructor(cameraRig: CameraRig, pois: PathPointMarker[] = [], props: PathPointsControlsProps = {}) {
    super();
    this.cameraRig = cameraRig;
    this.pois = pois;
    Object.assign(this, defaultProps, props);
    this.wheelAdaptor = new WheelAdaptor({ type: 'discrete', thresholdY: this.wheelThreshold });
    this.swipeAdaptor = new SwipeAdaptor({ thresholdY: this.swipeThreshold });

    if (this.useKeyboard) {
      this.keyboardAdaptor = new KeyboardAdaptor({
        type: 'discrete',
        keyMapping: {
          next: ['ArrowDown', 'ArrowRight'],
          prev: ['ArrowUp', 'ArrowLeft'],
        },
      });
      this.onKey = this.onKey.bind(this);
    }
    this.onCameraStart = this.onCameraStart.bind(this);
    this.onCameraUpdate = this.onCameraUpdate.bind(this);
    this.onCameraEnd = this.onCameraEnd.bind(this);
    this.onTrigger = this.onTrigger.bind(this);
  }

  getCurrentIndex(): number | null {
    return this.currentIndex;
  }

  enable(): void {
    if (this.useKeyboard && this.keyboardAdaptor) {
      this.keyboardAdaptor.addEventListener('trigger', this.onKey as any);
      this.keyboardAdaptor.connect();
    }
    this.wheelAdaptor.addEventListener('trigger', this.onTrigger as any);
    this.swipeAdaptor.addEventListener('trigger', this.onTrigger as any);
    this.cameraRig.addEventListener('CameraMoveStart', this.onCameraStart);
    this.cameraRig.addEventListener('CameraMoveUpdate', this.onCameraUpdate as any);
    this.cameraRig.addEventListener('CameraMoveEnd', this.onCameraEnd);
    this.wheelAdaptor.connect();
    this.swipeAdaptor.connect();
    this.enabled = true;
  }

  disable(): void {
    if (this.useKeyboard && this.keyboardAdaptor) {
      this.keyboardAdaptor.removeEventListener('trigger', this.onKey as any);
      this.keyboardAdaptor.disconnect();
    }
    this.wheelAdaptor.removeEventListener('trigger', this.onTrigger as any);
    this.swipeAdaptor.removeEventListener('trigger', this.onTrigger as any);
    this.cameraRig.removeEventListener('CameraMoveStart', this.onCameraStart);
    this.cameraRig.removeEventListener('CameraMoveUpdate', this.onCameraUpdate as any);
    this.cameraRig.removeEventListener('CameraMoveEnd', this.onCameraEnd);
    this.wheelAdaptor.disconnect();
    this.swipeAdaptor.disconnect();
    this.enabled = false;
  }

  update(): void {
    // nothing to do here
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private onKey(event: KeyboardAdaptorDiscreteEvent): void {
    switch (event.trigger) {
      case 'prev':
        this.onTrigger({ y: -1, x: 0, type: 'trigger' });
        break;
      case 'next':
        this.onTrigger({ y: 1, x: 0, type: 'trigger' });
        break;
      default:
        break;
    }
  }

  private onTrigger(event: SwipeAdaptorEvent): void {
    const index = (this.currentIndex || 0) + event.y;

    if (index >= this.pois.length) {
      this.dispatchEvent({
        type: 'ExitPOIs',
        exitFrom: 'end',
      } as ExitPOIsEvent);
    } else if (index < 0) {
      this.dispatchEvent({
        type: 'ExitPOIs',
        exitFrom: 'start',
      } as ExitPOIsEvent);
    } else {
      this.upcomingIndex = index;
      this.cameraRig.flyToKeyframe(this.pois[this.upcomingIndex].frame, this.duration, this.ease);
    }
  }

  private updatePois(progress: number): void {
    this.dispatchEvent({
      type: 'update',
      currentIndex: this.currentIndex,
      upcomingIndex: this.upcomingIndex,
      progress,
    } as UpdatePOIsEvent);
  }

  private onCameraStart(): void {
    this.updatePois(0);
  }

  private onCameraUpdate(event: UpdatePOIsEvent): void {
    this.updatePois(event.progress);
  }

  private onCameraEnd(): void {
    this.currentIndex = this.upcomingIndex;
    this.upcomingIndex = null;
  }
}
