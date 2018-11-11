import express, { Request, Response } from 'express'
import * as t from 'io-ts'
import * as R from 'ramda'
import { PathReporter } from '../../lib/reporters'
import responseFactory from '../lib/response'

const router = express.Router()

const EmailRequest = R.compose(
  t.exact,
  t.type,
)({
  from: t.string,
  body: t.string,
})

router.post('/', (req: Request, res: Response) => {
  const response = responseFactory(res)
  EmailRequest.decode(req.body).fold(
    R.compose(
      response.bad_request,
      PathReporter.failure,
    ),
    data => {
      response.ok(data)
    },
  )
})

export default router
