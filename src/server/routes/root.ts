import express, { Request, Response } from 'express'
import responseFactory from '../lib/response'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  responseFactory(res).ok({
    message: 'OK',
  })
})

export default router
