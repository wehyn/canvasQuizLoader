const prefix = 'canvas-quiz-loader'

export interface BrowserMessage {
  type: BrowserMessageType,
  message?: any
}

export enum BrowserMessageType {
  DEBUG = `${prefix}-debug`,
  PING = `${prefix}-ping`,
  PONG = `${prefix}-pong`,
}