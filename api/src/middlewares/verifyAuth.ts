import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'

export default function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string

    let headerToken = null
    const authHeader = req.headers.authorization || ''
    if (authHeader) {
      headerToken = authHeader.split(' ')[1]
    }

    const cookieToken = req.cookies.token

    const token = headerToken || cookieToken

    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    console.log('error:', error)
    throw new ForbiddenError()
  }
}
