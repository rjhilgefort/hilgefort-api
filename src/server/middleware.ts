import { NextFunction, Request, Response } from 'express'

export const cors = (_: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
}

export const emailClient = smtp => (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.smtp = smtp
  next()
}
