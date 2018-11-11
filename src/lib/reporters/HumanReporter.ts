import {
  Context,
  getFunctionName,
  Validation,
  ValidationError,
} from 'io-ts/lib'

const stringify = (v: any): string =>
  typeof v === 'function' ? getFunctionName(v) : JSON.stringify(v)

const getContextKey = (context: Context): string => context[1].key

const getContextType = (context: Context): string => context[1].type.name

const getMessage = (v: any, context: Context): string => {
  const key = getContextKey(context)
  const type = getContextType(context)
  const value = stringify(v)
  return `\`${key}: ${type}\` was passed invalid value: ${value}`
}

export const failure = (es: ValidationError[]): string[] =>
  es.map(e => getMessage(e.value, e.context))

export const success = (): string[] => ['No errors!']

export const report = (validation: Validation<any>) =>
  validation.fold(failure, success)

const HumanReporter = {
  failure,
  success,
  report,
}

export default HumanReporter
