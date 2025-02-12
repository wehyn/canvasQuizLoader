import { copyError } from "../utils/data-utils";
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: 'pub1b40d87cd5789b981aad8bd37e4e01a4',
  site: 'us3.datadoghq.com',
  forwardErrorsToLogs: false,
  sessionSampleRate: 100,
  version: '0.5.2',
  service: 'canvas-quiz-loader',
  env: 'production'
})


interface LogEntry {
  timestamp: string;
  type: 'log' | 'info' | 'warn' | 'error';
  message: any[];
}

export class BrowserLogger {
  private static instance: BrowserLogger;
  private logs: LogEntry[] = [];

  private constructor() {
    this.logs = [];
  }

  public static getInstance(): BrowserLogger {
    if (!BrowserLogger.instance) {
      BrowserLogger.instance = new BrowserLogger();
    }
    return BrowserLogger.instance;
  }

  public log(...args: any[]): void {
    this._storeLog('log', ...args);
    console.log(...args);
  }

  public info(...args: any[]): void {
    this._storeLog('info', ...args);
    console.info(...args);
  }

  public warn(...args: any[]): void {
    this._storeLog('warn', ...args);
    console.warn(...args);
  }

  public error(...args: any[]): void {
    const firstError = args.find(e => e instanceof Error)
    this._storeLog('error', ...args.map(copyError))
    datadogLogs.logger.error(args.join(' '), null, firstError)
    console.error(...args);
  }

  private _storeLog(type: 'log' | 'info' | 'warn' | 'error', ...args: any[]): void {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, type, message: args });
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public getLogs(): LogEntry[] {
    return this.logs;
  }
}