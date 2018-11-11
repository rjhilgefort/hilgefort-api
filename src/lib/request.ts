import axios from 'axios'
import { call, compose, concat, pathEq, prop, unless } from 'ramda'
import { isNotNil, thenP, thenP2, throwT } from '../utils'

export const GET = 'get'
export const POST = 'post'

const dataProp = prop('data')

export const request = (baseURL: string) => (url: string) => (data?: object) =>
  axios({
    baseURL,
    data,
    method: isNotNil(data) ? POST : GET,
    url,
  })

export const exchangeGet = ({
  host,
  prefix,
}: {
  host: string
  prefix: string
}) => (path: string) =>
  compose(
    thenP2(dataProp)(
      compose(
        throwT,
        dataProp,
      ),
    ),
    thenP(unless(pathEq(['status'], 200), throwT)),
    call,
    // @ts-ignore
    request(host),
    concat(prefix),
  )(path)
