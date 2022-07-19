import { Damper, DamperValues } from '../Damper';

import { BaseAdaptor, ContinuousEvent, IntertiaCompleteEvent } from './BaseAdaptor';

/**
 * Event: Fired when when the 'in view' amount of the given DOM element changes
 */
export interface ScrollAdaptorEvent extends ContinuousEvent {
  values: DamperValues;
  dampenedValues: DamperValues;
}

/**
 * Properties that can be passed to the {@link three-story-controls#ScrollAdaptor} constructor
 */
export interface ScrollAdaptorProps {
  /** Long DOM Element to observe */
  scrollElement?: HTMLElement | null;
  /** Offset to start registering scroll, in px or vh. Default starts when top of element is at bottom of viewport. */
  startOffset?: string;
  /** Offset to end registering scroll, in px or vh. Default ends when bottom of element is at top of viewport. */
  endOffset?: string;
  /** Buffer before and after element to start registering scroll. Number between 0 and 1, defaults to 0.1 */
  buffer?: number;
  /** Value between 0 and 1. Defaults to 0.5 */
  dampingFactor?: number;
}

/**
 * Emits normalized values for the amount a given DOM element has been scrolled through.
 */
export class ScrollAdaptor extends BaseAdaptor {
  private scrollElement: HTMLElement = document.body;
  private damper: Damper;
  private dampingFactor = 0.5;
  private values: DamperValues;
  private lastSeenScrollValue: number;
  private previousScrollValue: number;
  private startPosition = 0;
  private endPosition = 0;
  private distance = 0;
  private bufferedStartPosition = 0;
  private bufferedEndPosition = 0;
  private startOffset = '0px';
  private endOffset = '0px';
  private buffer = 0.1;
  private resizeObserver: ResizeObserver;
  private connected = false;

  constructor(props: ScrollAdaptorProps) {
    super();
    this.scrollElement = props.scrollElement || this.scrollElement;
    this.lastSeenScrollValue = window.scrollY || -1;
    this.previousScrollValue = this.lastSeenScrollValue;
    this.values = {
      scrollPx: null,
      scrollPercent: null,
    };
    this.damper = new Damper({
      values: this.values,
      dampingFactor: this.dampingFactor,
    });
    this.calculateDimensions = this.calculateDimensions.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.resizeObserver = new ResizeObserver(() => this.calculateDimensions());
    this.calculateDimensions();
  }

  connect(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.resizeObserver.observe(document.body);
    this.connected = true;
  }

  disconnect(): void {
    window.removeEventListener('scroll', this.onScroll);
    this.resizeObserver.unobserve(document.body);
    this.connected = false;
  }

  update(): void {
    if (
      this.lastSeenScrollValue !== this.previousScrollValue &&
      this.lastSeenScrollValue >= this.bufferedStartPosition &&
      this.lastSeenScrollValue <= this.bufferedEndPosition
    ) {
      const scrollPx = Math.max(0, Math.min(this.distance, this.lastSeenScrollValue - this.startPosition));
      const scrollPercent = Math.max(0, Math.min(1, scrollPx / this.distance));

      this.values = { scrollPx, scrollPercent };
      this.damper.setTarget(this.values);
      this.previousScrollValue = this.lastSeenScrollValue;
    }

    if (!this.damper.reachedTarget()) {
      this.damper.update();
      this.dispatchEvent({
        type: 'update',
        values: this.values,
        dampenedValues: this.damper.getCurrentValues(),
      } as ScrollAdaptorEvent);

      if (this.damper.reachedTarget()) {
        this.dispatchEvent({ type: 'inertiacomplete' } as IntertiaCompleteEvent);
      }
    }
  }

  isEnabled(): boolean {
    return this.connected;
  }

  parseOffset(offset: string): number {
    let amount = 0;

    if (offset) {
      amount = parseInt(offset);

      if (offset.indexOf('vh') !== -1) {
        amount = (amount * window.innerHeight) / 100;
      } else if (this.distance && offset.indexOf('%') !== -1) {
        amount = (amount * this.distance) / 100;
      }
    }

    return amount;
  }

  private calculateOffset(element: HTMLElement): number {
    if (!element) {
      return 0;
    }

    return this.calculateOffset(element.offsetParent as HTMLElement) + element.offsetTop;
  }

  private calculateDimensions(): void {
    const elementHeight = this.scrollElement.clientHeight;
    const offsetTop = this.calculateOffset(this.scrollElement);

    this.startPosition = offsetTop - window.innerHeight + this.parseOffset(this.startOffset);
    this.endPosition = offsetTop + elementHeight + this.parseOffset(this.endOffset);
    this.distance = this.endPosition - this.startPosition;

    this.bufferedStartPosition = Math.max(0, this.startPosition * (1 - this.buffer));
    this.bufferedEndPosition = Math.min(this.endPosition * (1 + this.buffer), elementHeight);
  }

  private onScroll(): void {
    this.lastSeenScrollValue = window.scrollY;
  }
}
