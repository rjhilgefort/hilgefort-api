import * as bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import { log } from '../lib/logger'
import { cors } from './middleware'
import contact from './routes/contact'
import root from './routes/root'

const PORT: number = 4040

export default () => {
  const app: express.Application = express()

  app.use(morgan('tiny'))
  app.use(cors)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/', root)
  app.use('/contact', contact)

  app.listen(PORT, () => {
    log('\n')
    log('Server started!')
    log(`Listening on port: ${PORT}`)
  })

  return app
}
