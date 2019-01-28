const { def } = require('../types')
const R = require('ramda')

const always = def
  ('always :: a -> Any -> a')
  (R.always)

// TODO: Should be: ('cond :: [[Predicate, a -> b]] -> a -> b')
const cond = def
  ('cond :: [[Function]] -> a -> b')
  (R.cond)

const T = def
  ('T :: Any -> Boolean')
  (R.T)

const pickAll = def
  ('pickAll :: [String] -> Object -> Object')
  (R.pickAll)

const evolve = def
  ('evolve :: Object -> Object -> Object')
  (R.evolve)

// TODO: This doesn't support the variadic interface of `R.applySpec`
const applySpec = def
  ('applySpec :: StrMap Function -> Any -> Object')
  (R.applySpec)

const defaultTo = def
  ('defaultTo :: Any -> Any -> Any')
  (R.defaultTo)

module.exports = {
  always,
  cond,
  T,
  pickAll,
  evolve,
  applySpec,
  defaultTo,
}

