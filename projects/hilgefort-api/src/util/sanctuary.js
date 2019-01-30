const { create } = require('sanctuary')
const { $, env } = require('../types')

const S = create ({
  checkTypes: true,
  env
})

module.exports = S
