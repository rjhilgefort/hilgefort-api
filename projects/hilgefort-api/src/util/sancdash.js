const { def } = require('../types')
const _ = require('lodash/fp')

module.exports = {
  isEmpty: def
    ('isEmpty :: Any -> Boolean')
    (_.isEmpty),

  toInteger: def
    ('toInteger :: Any -> Integer')
    (_.toInteger),
}
