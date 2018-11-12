import express, { Request, Response } from 'express'
import * as t from 'io-ts'
import * as R from 'ramda'
import dedent from 'dedent'
import env from '../../env'
import { HumanReporter } from '../../lib/reporters'

const {
  SMTP_TO_ADDRESS
} = env

const router = express.Router()

const EmailRequest = R.compose(
  t.exact,
  t.type,
)({
  email: t.string,
  phone: t.string,
  message: t.string,
})

router.post('/', (req: Request, res: Response) => {
  EmailRequest.decode(req.body).fold(
    R.compose(
      res.locals.response.bad_request,
      HumanReporter.failure,
    ),
    ({ email, phone, message }) => {
      return res.locals.smtp.sendMail({
        // TODO: Can this line be removed?
        from: email,
        to: SMTP_TO_ADDRESS,
        subject: `Website Inquiry For: ${req.hostname}`,
        text: dedent`
          WEBSITE: ${req.hostname}
          EMAIL:   ${email}
          PHONE:   ${phone}
          MESSAGE: ${message}
        `,
      })
        .then(res.locals.response.success, res.locals.response.bad_request)
    },
  )
})

export default router
