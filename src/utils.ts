import _ from 'lodash/fp'
import * as R from 'ramda'

export const isNot = R.complement(R.is)
export const isNotNil = R.complement(R.isNil)
export const isNotEmpty = R.complement(_.isEmpty)

export const isEmptyString = R.allPass([_.isString, _.isEmpty])
export const isPopulatedString = R.allPass([_.isString, isNotEmpty])

export const Null = R.always(null)

export const PromiseResolve = (x: any): Promise<any> => Promise.resolve(x)
export const PromiseReject = (x: any): Promise<any> => Promise.reject(x)
export const PromiseAll = (x: any): Promise<any> => Promise.all(x)

export const thenP = (success: any) => (promise: Promise<any>): any =>
  promise.then(success)
export const thenP2 = (success: any) => (error: any) => (
  promise: Promise<any>,
): Promise<any> => promise.then(success, error)
export const catchP = (error: any) => (promise: Promise<any>): Promise<any> =>
  promise.catch(error)

export const throwT = (x: any) => {
  throw x
}
