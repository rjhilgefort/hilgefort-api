// const {
//   test,
// } = require('../util')
const { prisma: prismaClient } = require('../generated/prisma-client')

// const prismaError = (e) => {
//   // Prisma gives this error instead of returning null when nothing matches
//   if (test (/Cannot convert undefined or null to object/) (e.message)) {
//     throw new Error('Not found')
//   }
//   throw e
// }

const prisma = {
  ...prismaClient,
  // user: (...args) => prismaClient.user(...args).catch(prismaError),
}

module.exports = { prisma }
