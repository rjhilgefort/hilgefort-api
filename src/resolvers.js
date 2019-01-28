const dedent = require('dedent')
const { $ } = require('./types')
const {
  cond, is, pipe, prop, T, propsIs, pickAll, promiseResolveT,
  when, applySpec, test,
} = require('./util')
const {
  SMTP_TO_ADDRESS,
} = require('./env')

const prismaError = (e) => {
  // Prisma gives this error instead of returning null when nothing matches
  if (test (/Cannot convert undefined or null to object/) (e.message)) {
    throw new Error('Not found')
  }
  throw e
}

const resolvers = {
  Query: {

    user: (_, args, { prisma }) => pipe([
      pickAll(['userId', 'email']),
      cond([
        [
          propsIs(['userId']) ($.String),
          ({ userId: id }) => prisma.user({ id })
            .catch(prismaError)
        ],
        [
          propsIs(['email']) ($.String),
          ({ email }) => prisma.user({ email })
            .catch(prismaError)
        ],
        [
          T,
          promiseResolveT(null),
        ],
      ])
    ])(args),

    users: (_, __, { prisma }) => prisma.users(),

    messages: (_, __, { prisma }) => prisma.messages(),

    messagesByUser: (_, { userId: id }, { prisma }) =>
      prisma.user({ id }).messages(),
    
  },

  Mutation: {

    createUser: (_, args, { prisma }) =>
      pipe([
        applySpec({
          email: prop('email'),
          name: prop('name'),
          phone: prop('phone'),
          messages: pipe([
            prop('message'),
            when
              (is($.String))
              (x => ({
                create: [{
                  content: x,
                }],
              }))
          ]),
        }),
        prisma.createUser,
      ])(args),

    createMessage: (_, { userId: id, content }, { prisma }) =>
      prisma.createMessage({
        content,
        from: {
          connect: { id }
        },
      }),

    contact: async (_, {
      email,
      name,
      phone,
      message: content,
    }, {
      prisma,
      smtp,
      req: {
        hostname,
      },
    }) => {
      const user = await prisma.upsertUser({
        where: {
          email,
        },
        update: {
          name,
          phone,
          messages: {
            create: [{
              content,
            }],
          },
        },
        create: {
          email,
          name,
          phone,
          messages: {
            create: [{
              content,
            }],
          },
        },
      })

      await smtp.sendMail({
        from: email,
        to: SMTP_TO_ADDRESS,
        subject: `Website Inquiry For: ${hostname}`,
        text: dedent`
          WEBSITE: ${hostname}
          NAME:    ${name}
          EMAIL:   ${email}
          PHONE:   ${phone || ''}
          MESSAGE: ${content}
        `,
      })

      return user
    }

  },

  User: {
    messages: ({ id }, _, { prisma }) =>
      prisma.user({ id }).messages()
  },

  Message: {
    from: ({ id }, _, { prisma }) =>
      prisma.message({ id }).from()
  }
}

module.exports = {
  resolvers
}
