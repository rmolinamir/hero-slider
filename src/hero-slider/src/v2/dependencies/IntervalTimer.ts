export enum IntervalState {
  IDLE,
  RUNNING,
  PAUSED,
  RESUME
}

/**
 * `IntervalTimer` is a class that handles logic for intervals, e.g. start stop, reset, resume, pause & maximum amount of fires.
 */
export default class IntervalTimer {
  /**
   * The state to handle logic.
   * - 0 means the interval is idle.
   * - 1 means it's running.
   * - 2 means it's paused
   * - 3 will resume.
   */
  public state: IntervalState = IntervalState.IDLE;

  /**
   * Remaining time before the next interval.
   */
  public remaining: number = 0;

  /**
   * Amount of times fired.
   */
  public fires: number = 0;

  /**
   * Time passed after pausing,
   */
  public pausedTime: number | Date = 0;

  public lastTimeFired?: Date;
  public timerId?: NodeJS.Timeout;
  public resumeId?: NodeJS.Timeout;
  public lastPauseTime?: Date;

  private constructor(
    /**
     * Called after every interval.
     */
    public callback: () => void = () => {},
    /**
     * Time between intervals, in milliseconds.
     */
    public interval: number,
    /**
     * Maximum amount of fires.
     */
    public maxFires: number | undefined = undefined
  ) {}

  /**
   * Handles the callback execution, the amount of fires, & the times when fired.
   * If `this.maxFires` is **not** null, and it's bigger than `this.fires` and if `this.fires` exists, meaning if it the interval was at least started once before, then never fire again.
   */
  private intervalHandler = () => {
    if (
      this.maxFires != null &&
      this.fires !== 0 &&
      this.fires >= this.maxFires
    ) {
      this.stop();
    } else {
      this.lastTimeFired = new Date();
      this.fires += 1;
      this.callback();
    }
  };

  /**
   * `timeoutHandler` is executed by `resume`. `timeoutHandler` is the callback of a new `setTimeout` executed by `resume` to mimic a resume function.
   * The callback is executed by running `intervalHandler`, and then `start` is executed to run a new interval.
   */
  private timeoutHandler = () => {
    if (this.state !== IntervalState.RESUME) return;

    this.pausedTime = 0;
    this.intervalHandler();
    this.start();
  };

  /**
   * `start` executes the interval, and saves the interval ID for further use.
   * The time of execution is also fired in case it's paused later on. The state
   * is finally set as running.
   */
  public start = () => {
    this.timerId = setInterval(this.intervalHandler, this.interval);
    this.lastTimeFired = new Date();
    this.state = IntervalState.RUNNING;
  };

  /**
   * `stop` clears every respective timeout and interval, then sets the state as idle.
   */
  public stop = () => {
    if (this.state === 0) return;

    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.state = IntervalState.IDLE;
  };

  /**
   * Resets the interval.
   */
  public reset = () => {
    this.stop();
    this.start();
  };

  /**
   * `pause` tries to mimic pausing the interval by calculating the remaining time and storing it
   * in a member variable. Afterwards clear the respective timeout and interval then set the new
   * state.
   */
  public pause = () => {
    if (
      this.state !== IntervalState.RUNNING &&
      this.state !== IntervalState.RESUME
    )
      return;

    this.remaining =
      +this.interval -
      (+new Date() - +(this.lastTimeFired || 0)) +
      +this.pausedTime;
    this.lastPauseTime = new Date();
    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.state = IntervalState.PAUSED;
  };

  /**
   * `resume` calculates the remaining time for the callback to trigger using the values
   * set by `paused`. Will execute a new `setTimeout` while passing the `remaining` time
   * as the timeout delay.
   */
  public resume = () => {
    if (this.state !== IntervalState.PAUSED) return;
    const currentDate = new Date();
    this.pausedTime =
      +this.pausedTime + +currentDate - +(this.lastPauseTime || 0);
    this.state = IntervalState.RESUME;
    this.resumeId = setTimeout(this.timeoutHandler, this.remaining);
  };

  /**
   * Set a new interval to use on the next interval loop.
   */
  public setInterval = (newInterval: number) => {
    if (this.state === 1) {
      // If running we need to instantiate (new ID) the variable.
      this.pause();
      this.interval = newInterval;
      this.resume();
    } else {
      // If stopped, idle, or paused then switch it.
      this.interval = newInterval;
    }
  };

  /**
   * Maximum amount of times the `callback` member will execute, it's infinite by default.
   */
  public setMaxFires = (newMax: number) => {
    if (newMax != null && this.fires >= newMax) {
      this.stop();
    }
    this.maxFires = newMax;
  };

  private static instance: IntervalTimer | undefined;

  public static new(
    callback: () => void,
    interval: number,
    maxFires: number | undefined = undefined
  ) {
    if (!this.instance)
      this.instance = new IntervalTimer(callback, interval, maxFires);
    else {
      this.instance.callback = callback;
      this.instance.interval = interval;
    }
    return this.instance;
  }
}
