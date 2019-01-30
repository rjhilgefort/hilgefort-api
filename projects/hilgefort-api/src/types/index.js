const $ = require('sanctuary-def')
const { create } = require('hm-def')
const Z = require('sanctuary-type-classes');
// NOTE: This is the only file allowed to use lodash and ramda directly
const _ = require('lodash/fp')
const R = require('ramda')

// name :: String -> String
const name = x => `hilgefort-api/${x}`

const lib = {
  Promise: $.NullaryType
    (name('Promise'))('')
    (x => Promise.resolve(x) == x),

  EmptyString: $.NullaryType
    (name('EmptyString'))('')
    (R.allPass([
      $.test([])($.String),
      _.isEmpty,
    ])),
}


// Any non-$ added here should also be added in the exports
const env = $.env.concat([
  $.Type,
  $.Any,
  $.Integer,
  ...R.values(lib),
])

const def = create ({
  $,
  checkTypes: true,
  env,
  typeClasses: [
    Z.Functor,
    Z.Semigroup,
  ],
});

module.exports = {
  $: {
    ...$,
    ...lib,
  },
  env,
  def,
}
