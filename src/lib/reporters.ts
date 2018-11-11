// tslint:disable:no-submodule-imports
// https://github.com/gcanti/io-ts#error-reporters

import * as PathReporter from 'io-ts/lib/PathReporter'
import * as ThrowReporter from 'io-ts/lib/ThrowReporter'
// TODO: Could make a "ApiResponseReporter" with nicer validation responses

export {
  PathReporter,
  ThrowReporter,
}
