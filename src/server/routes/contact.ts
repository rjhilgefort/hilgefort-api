import express, { Request, Response } from 'express'
import * as t from 'io-ts'
import * as R from 'ramda'
import dedent from 'dedent'
import env from '../../env'
import { PathReporter } from '../../lib/reporters'
import responseFactory from '../lib/response'

const {
  SMTP_TO_ADDRESS
} = env

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
    ({ from, body }) => {
      res.locals.smtp.sendMail({
        from,
        to: SMTP_TO_ADDRESS,
        subject: `Website Inquiry From: ${req.hostname}`,
        text: dedent`
          WEBSITE: ${req.hostname}
          FROM:    ${from}
          MESSAGE: ${body}
        `,
      })
        .then(response.success, response.bad_request)
    },
  )
})

export default router
