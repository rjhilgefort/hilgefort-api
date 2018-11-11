import { compose, concat, equals, type } from 'ramda'
import { create, env } from 'sanctuary'
import $ from 'sanctuary-def'

const withNs = concat('jrh-api/')

// PromiseType :: Type
const PromiseType = $.NullaryType(withNs('Promise'))('Promise')(
  compose(
    equals('Promise'),
    type,
  ),
)

export interface SI {
  Left: (x: any) => any
  Right: (x: any) => any
  either: () => void
  isLeft: (x: any) => boolean
  map: () => void
  bimap: () => void
  // bimap1: Function;
  // bimap2: Function;
}
const S: SI = create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: env.concat([PromiseType]),
})

// S.bimap1 = (fn: Function) => S.bimap(fn)(fn);
// S.bimap2 = S.bimap;

export default S
