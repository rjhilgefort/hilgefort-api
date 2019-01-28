// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

const { google } = require('googleapis')
const nodemailer = require('nodemailer')
const { props } = require('../util')

const smtpFactory = async ({
  host,
  port,
  user,
  clientId,
  clientSecret,
  redirectUrl,
  refreshToken,
}) => {
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  )
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const accessToken = await oauth2Client
    .refreshAccessToken()
    .then(props(['credentials', 'access_token']))

  return nodemailer.createTransport({
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

module.exports = { smtpFactory }
