const { GraphQLServer } = require('graphql-yoga')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dedent = require('dedent')
const { prisma } = require('../prisma')
const { smtpFactory } = require('../lib/smtp')
const { resolvers } = require('../resolvers')
const {
  HTTP_PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_OAUTH_USER,
  SMTP_OAUTH_CLIENT_ID,
  SMTP_OAUTH_CLIENT_SECRET,
  SMTP_OAUTH_REDIRECT_URL,
  SMTP_OAUTH_REFRESH_TOKEN,
} = require('../env')

const server = async () => {
  const smtp = await smtpFactory({
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_OAUTH_USER,
    clientId: SMTP_OAUTH_CLIENT_ID,
    clientSecret: SMTP_OAUTH_CLIENT_SECRET,
    redirectUrl: SMTP_OAUTH_REDIRECT_URL,
    refreshToken: SMTP_OAUTH_REFRESH_TOKEN,
  })

  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: ({ request, response }) => ({
      prisma,
      smtp,
      req: request,
      res: response,
    }),
  })

  morgan.token('graphql-query', ({ body: { query, variables, operationName } }) =>
  dedent`
\n=====================================
GRAPHQL:
Operation Name: ${operationName}
Query: ${query}
Variables: ${JSON.stringify(variables)}
  `
  );
  server.express.use(bodyParser.json());
  server.express.use(morgan(':graphql-query'));

  server.start({
    port: HTTP_PORT
  }, () =>
    console.log(`Server is running on http://localhost:${HTTP_PORT}`)
  )

  return server
}

module.exports = { server }
