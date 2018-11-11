import dotenv from 'dotenv'
import * as t from 'io-ts'
import * as R from 'ramda'
import _ from 'lodash/fp'
import * as U from './utils'
import { HumanReporter } from './lib/reporters'

dotenv.config()

const Env = R.compose(t.type)({
  HTTP_PORT: t.number,
  MORGAN_LOG_SETTING: t.string, // t.union([ 'tiny' ]),
  SMTP_HOST: t.string,
  SMTP_PORT: t.number,
  SMTP_OAUTH_USER: t.string,
  SMTP_OAUTH_CLIENT_ID: t.string,
  SMTP_OAUTH_CLIENT_SECRET: t.string,
  SMTP_OAUTH_REDIRECT_URL: t.string,
  SMTP_OAUTH_REFRESH_TOKEN: t.string,
  SMTP_TO_ADDRESS: t.string,
})
export interface IEnv extends t.TypeOf<typeof Env> {}

const env = R.compose(
  // Transforms
  R.evolve({
    HTTP_PORT: _.toInteger,
    SMTP_PORT: _.toInteger,
  }),
  // Defaults
  R.evolve({
    HTTP_PORT: R.defaultTo('4040'),
    MORGAN_LOG_SETTING: R.defaultTo('tiny'),
    SMTP_HOST: R.defaultTo('smtp.gmail.com'),
    SMTP_PORT: R.defaultTo('465'),
    SMTP_OAUTH_REDIRECT_URL: R.defaultTo('https://developers.google.com/oauthplayground'),
  }),
  R.map(R.when(U.isEmptyString, U.Null)),
  R.pickAll(R.keys(Env.props)),
)(process.env)


const parsedEnv: IEnv = Env.decode(env).fold(
  R.compose(U.throwT, R.join('\n'), HumanReporter.failure),
  R.identity,
)

export default parsedEnv
