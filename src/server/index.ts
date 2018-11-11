import * as bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import env from '../env'
import { log } from '../lib/logger'
import smtpFactory from '../lib/smtp'
import { cors, emailClient, response } from './middleware'
import contact from './routes/contact'
import root from './routes/root'

const {
  HTTP_PORT,
  MORGAN_LOG_SETTING,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_OAUTH_USER,
  SMTP_OAUTH_CLIENT_ID,
  SMTP_OAUTH_CLIENT_SECRET,
  SMTP_OAUTH_REDIRECT_URL,
  SMTP_OAUTH_REFRESH_TOKEN,
} = env

export default async () => {
  const app: express.Application = express()

  const smtp = await smtpFactory({
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_OAUTH_USER,
    clientId: SMTP_OAUTH_CLIENT_ID,
    clientSecret: SMTP_OAUTH_CLIENT_SECRET,
    redirectUrl: SMTP_OAUTH_REDIRECT_URL,
    refreshToken: SMTP_OAUTH_REFRESH_TOKEN,
  })

  app.use(morgan(MORGAN_LOG_SETTING))
  app.use(cors)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(response)

  app.use('/', root)
  app.use('/contact', emailClient(smtp), contact)

  app.listen(HTTP_PORT, () => {
    log('\n')
    log('======================================================')
    log('\n')
    log('ENVIRONMENT CONFIG:')
    log(env)
    log('\n')
    log('Server started!')
    log(`Listening on port: ${HTTP_PORT}`)
  })

  return app
}
