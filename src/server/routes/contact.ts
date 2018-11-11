import express, { Request, Response } from 'express'
import * as t from 'io-ts'
import * as R from 'ramda'
import dedent from 'dedent'
import env from '../../env'
import { PathReporter } from '../../lib/reporters'

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
  EmailRequest.decode(req.body).fold(
    R.compose(
      res.locals.response.bad_request,
      PathReporter.failure,
    ),
    ({ from, body }) => {
      return res.locals.smtp.sendMail({
        from,
        to: SMTP_TO_ADDRESS,
        subject: `Website Inquiry From: ${req.hostname}`,
        text: dedent`
          WEBSITE: ${req.hostname}
          FROM:    ${from}
          MESSAGE: ${body}
        `,
      })
        .then(res.locals.response.success, res.locals.response.bad_request)
    },
  )
})

export default router
