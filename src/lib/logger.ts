// tslint:disable:no-console

export type Log = (x: any) => void
export const log: Log = console.log

export type Warn = (x: any) => void
export const warn: Warn = console.warn

export type Error = (x: any) => void
export const error: Error = console.error
