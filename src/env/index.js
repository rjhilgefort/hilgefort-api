const dotenv = require('dotenv')
const { $ } = require('../types')
const {
  pickAll, map, when, is, always, evolve, pipe, defaultTo, toInteger,
} = require('../util')

dotenv.config()

env = pipe([
  pickAll([
    'NODE_ENV',
    'HTTP_PORT',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_OAUTH_REDIRECT_URL',
    'SMTP_OAUTH_USER',
    'SMTP_OAUTH_CLIENT_ID',
    'SMTP_OAUTH_CLIENT_SECRET',
    'SMTP_OAUTH_REFRESH_TOKEN',
    'SMTP_TO_ADDRESS',
  ]),
  // Treat empty string as null
  map(when
    (is($.EmptyString))
    (always(null)),
  ),
  // Defaults
  evolve({
    HTTP_PORT:               defaultTo('4000'),
    SMTP_HOST:               defaultTo('smtp.gmail.com'),
    SMTP_PORT:               defaultTo('465'),
    SMTP_OAUTH_REDIRECT_URL: defaultTo('https://developers.google.com/oauthplayground'),
  }),
  // Transform strings to values
  evolve({
    HTTP_PORT: toInteger,
    SMTP_PORT: toInteger,
  }),
])(process.env)

module.exports = env
