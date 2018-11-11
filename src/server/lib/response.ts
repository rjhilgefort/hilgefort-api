import * as R from 'ramda'
import * as U from '../../utils'

const statusIsSuccess = R.propSatisfies(
  // @ts-ignore
  R.contains(R.__, [200]),
  'status'
)
const statusIsNotSuccess = R.propSatisfies(
  // @ts-ignore
  R.contains(R.__, [400, 500]),
  'status'
)

const assocSuccess = json =>
  R.assoc(
    'success',
    R.cond([
      [statusIsSuccess, R.T],
      [statusIsNotSuccess, R.F],
      [R.T, U.Null],
    ])(json),
    json,
  )

const assocPayload = R.curry((
  key: string,
  payload: object,
  json: object,
): object => {
  if (U.isNotNil(key)) {
    return R.assoc(key, payload, json)
  }
  return json
})

export const responseBuilder = R.curry((res, status, key, payload) => {
  try {
    res.status(status)
    return R.compose(
      (x) => res.json(x),
      assocPayload(key, payload),
      assocSuccess,
      R.assoc('status', status),
    )({})
  } catch (e) {
    console.log(e)
    res.status(501)
    res.json({
      status: 501,
      error: e.message,
    })
  }
})

export const responseFactory = res => ({
  response: responseBuilder(res),
  bad_request: responseBuilder(res, 400, 'error'),
  ok: responseBuilder(res, 200, 'data'),
  success: () => responseBuilder(res, 200, null, null),
  failure: () => responseBuilder(res, 500, null, null),
})

export default responseFactory
