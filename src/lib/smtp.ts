// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import * as R from 'ramda'

export interface SmtpFactoryFactory {
  host: string
  port: string
  user: string
  clientId: string
  clientSecret: string
  redirectUrl: string
  refreshToken: string
}
const smtpFactory = async ({
  host,
  port,
  user,
  clientId,
  clientSecret,
  redirectUrl,
  refreshToken,
}: SmtpFactoryFactory): Promise<any> => {
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  )
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const accessToken = await oauth2Client
    .refreshAccessToken()
    .then(R.path(['credentials', 'access_token']))

  return nodemailer.createTransport({
    // @ts-ignore
    host,
    port,
    secure: true,
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  })
}

export default smtpFactory
