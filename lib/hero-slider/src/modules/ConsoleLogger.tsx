export type LoggerLevels = {
  verbose: boolean;
  info: boolean;
  debug: boolean;
  warnings: boolean;
  errors: boolean;
};

/**
 * ConsoleLogger singleton.
 */
export default class ConsoleLogger {
  private constructor(private levels: LoggerLevels) {}

  public log(...data: unknown[]): void {
    // eslint-disable-next-line no-console
    if (this.levels.verbose) console.log(...data);
  }

  public info(...data: unknown[]): void {
    if (this.levels.info) console.info(...data);
  }

  public debug(...data: unknown[]): void {
    if (this.levels.debug) console.debug(...data);
  }

  public warn(...data: unknown[]): void {
    if (this.levels.warnings) console.warn(...data);
  }

  public error(...data: unknown[]): void {
    if (this.levels.errors) console.error(...data);
  }

  private static instance: ConsoleLogger | undefined;

  public static new(
    levels: LoggerLevels = {
      verbose: false,
      info: false,
      debug: false,
      warnings: true,
      errors: true
    }
  ): ConsoleLogger {
    if (!this.instance) this.instance = new ConsoleLogger(levels);
    else this.instance.levels = levels;
    return this.instance;
  }
}
