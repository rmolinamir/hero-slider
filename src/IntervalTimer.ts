/**
 * Based on **`[Pause and resume setInterval](https://stackoverflow.com/a/42240115/10246377)`**.
 * `IntervalTimer` is a class that handles logic for intervals, e.g. start
 * stop, reset, resume, pause & maximum amount of fires.
 */

import { TAnyFunction } from './Slider/typings'

export enum EState {
  IDLE,
  RUNNING,
  PAUSED,
  RESUME
}

export interface IIntervalTimer {
  callback: TAnyFunction
  state: EState
  remaining: number
  interval: number
  fires: number
  maxFires?: number
  pausedTime: number | Date
  lastTimeFired: Date
  timerId: NodeJS.Timeout
  resumeId: NodeJS.Timeout
  lastPauseTime: Date
}

class IntervalTimer implements IIntervalTimer {
  // Init
  callback: TAnyFunction = () => null
  interval: number
  maxFires?: number
  state: EState
  remaining: number
  fires: number
  pausedTime: number | Date
  lastTimeFired: Date
  timerId: NodeJS.Timeout
  resumeId: NodeJS.Timeout
  lastPauseTime: Date

  constructor (callback: TAnyFunction, interval: number, maxFires: number | undefined = undefined) {
    /**
     * Remaining time before the next interval.
     */
    this.remaining = 0
    /**
     * The state to handle logic.
     * - 0 means the interval is idle.
     * - 1 means it's running.
     * - 2 means it's paused
     * - 3 will resume.
     */
    this.state = EState.IDLE

    this.interval = interval // In milliseconds.
    this.callback = callback
    /**
     * Maximum amount of fires.
     */
    this.maxFires = maxFires
    /**
     * Time passed after pausing,
     */
    this.pausedTime = 0

    this.fires = 0
  }

  /**
   * `proxyCallback` handles the callback execution, the amount of fires, & the times when fired.
   * If `this.maxFires` is **not** null, and it's bigger than `this.fires` and if `this.fires` exists,
   * meaning if it the interval was at least started once before, then never fire again.
   */
  proxyCallback = () => {
    if (this.maxFires != null && this.fires !== 0 && this.fires >= this.maxFires) {
      this.stop()
      return
    }
    this.lastTimeFired = new Date()
    this.fires++
    this.callback()
  }

  /**
   * `start` executes the interval, and saves the interval ID for further use.
   * The time of execution is also fired in case it's paused later on. The state
   * is finally set as running.
   */
  start = () => {
    this.timerId = setInterval(() => this.proxyCallback(), this.interval)
    this.lastTimeFired = new Date()
    this.state = EState.RUNNING
  }

  /**
   * `stop` clears every respective timeout and interval, then sets the state as idle.
   */
  stop = () => {
    if (this.state === 0) return

    clearInterval(this.timerId)
    clearTimeout(this.resumeId)
    this.state = EState.IDLE
  }

  /**
   * Resets the interval.
   */
  reset = () => {
    this.stop()
    this.start()
  }

  /**
   * `pause` tries to mimic pausing the interval by calculating the remaining time and storing it
   * in a member variable. Afterwards clear the respective timeout and interval then set the new
   * state.
   */
  pause = () => {
    if (this.state !== EState.RUNNING && this.state !== EState.RESUME) return

    this.remaining = +this.interval - (+new Date() - +this.lastTimeFired) + +this.pausedTime
    this.lastPauseTime = new Date()
    clearInterval(this.timerId)
    clearTimeout(this.resumeId)
    this.state = EState.PAUSED
  }

  /**
   * `resume` calculates the remaining time for the callback to trigger using the values
   * set by `paused`. Will execute a new `setTimeout` while passing the `remaining` time
   * as the timeout delay.
   */
  resume = () => {
    if (this.state !== EState.PAUSED) return
    const currentDate = new Date()
    this.pausedTime = +this.pausedTime + +currentDate - +this.lastPauseTime
    this.state = EState.RESUME
    this.resumeId = setTimeout(() => this.timeoutCallback(), this.remaining)
  }

  /**
   * `timeoutCallback` is executed by `resume`. `timeoutCallback` is the
   * callback of a new `setTimeout` executed by `resume` to mimic a resume
   * function.
   * We execute the callback by running `proxyCallback`, and then `start`
   * is executed to run a new interval.
   */
  timeoutCallback = () => {
    if (this.state !== EState.RESUME) return

    this.pausedTime = 0
    this.proxyCallback()
    this.start()
  }

  /**
   * Set a new interval to use on the next interval loop.
   */
  setInterval = (newInterval: number) => {
    if (this.state === 1) {
      // If running we need to instantiate (new ID) the variable.
      this.pause()
      this.interval = newInterval
      this.resume()
    } else {
      // If stopped, idle, or paused then switch it.
      this.interval = newInterval
    }
  }

  /**
   * Maximum amount of times the `callback` member will execute, it's infinite by default.
   */
  setMaxFires = (newMax: number) => {
    if (newMax != null && this.fires >= newMax) {
      this.stop()
    }
    this.maxFires = newMax
  }
}

export default IntervalTimer
