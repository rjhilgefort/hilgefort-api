import dotenv from 'dotenv'
import { complement, where } from 'ramda'

dotenv.config()

export const isValid = (env: object): boolean => where({})(env)

export const notValid = complement(isValid)
