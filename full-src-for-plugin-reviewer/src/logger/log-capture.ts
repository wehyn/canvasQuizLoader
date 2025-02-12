import { BrowserMessage, BrowserMessageType } from "../interfaces/message.interface";
import { BrowserLogger } from "./logger";

const logger = BrowserLogger.getInstance()

function getLogs(): string {
  const logs: string[] = []

  logs.push('--------------- HTML SECTION START ---------------\n')
  logs.push(document.documentElement.outerHTML)
  logs.push('\n--------------- HTML SECTION END ---------------\n\n')

  logs.push('--------------- LOGS SECTION START ---------------\n')
  logs.push(JSON.stringify(logger.getLogs(), null, 2))
  logs.push('\n--------------- LOGS SECTION END ---------------\n\n')

  return logs.join('')
}

function registerErrorListeners(): void {
  window.addEventListener('error', (event: ErrorEvent): void => {
    const { message, filename: source, lineno, colno, error } = event;
    logger.error('Unhandled Error:', { message, source, lineno, colno, error });
  });


  window.addEventListener('unhandledrejection', function(event ) {
    const reason = event.reason;
    logger.error('Unhandled Promise Rejection:', reason)
  });
}

export function startLogCapture(): void {
  registerErrorListeners()
  
  browser.runtime.onMessage.addListener((message: BrowserMessage, sender, sendResponse) => {
    switch (message.type) {
      case BrowserMessageType.DEBUG: {
        sendResponse(getLogs())
        break;
      } 
      case BrowserMessageType.PING: {
        sendResponse(BrowserMessageType.PONG)
        break;
      }
      default: return Promise.reject(new Error('Invalid type'));
    }
    return true
  }) 
}
