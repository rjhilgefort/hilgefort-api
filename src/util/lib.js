const { $, def } = require('../types')
const {
  toUpper, concat, splitOn, pipe, is, keys, type, props,
} = require('./sanctuary')

const sum = def
  ('sum :: Number -> Number -> Number')
  (a => b => a + b);

const concatUpperSplit = def
  ('concatUpperSplit :: String -> String -> [String]')
  (a => b => pipe ([
    concat (a),
    toUpper,
    splitOn (' ')
  ]) (b))

const propsIs = def
  ('propsIs :: [String] -> Type -> Object -> Boolean')
  (path => type => x => pipe([ props(path), is(type) ])(x))

const promiseResolveT = def
  ('promiseResolveT :: a -> Any -> a')
  (x => () => Promise.resolve(x))

module.exports = {
  sum,
  concatUpperSplit,
  propsIs,
  promiseResolveT,
}
