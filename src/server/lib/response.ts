import * as R from 'ramda'

export const responseBuilder = R.curry((res, status, key, payload) => {
  res.status(status)
  res.json({
    status,
    [key]: payload,
  })
  return res
})

export const responseFactory = res => ({
  response: responseBuilder(res),
  bad_request: responseBuilder(res, 400, 'error'),
  ok: responseBuilder(res, 200, 'data'),
})

export default responseFactory
