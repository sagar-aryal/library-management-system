import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { User } from '../models/User'
import { JWT_SECRET } from '../util/secrets'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/auth prefix

router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user = req.user as User
    console.log(user)
    // Generate access token and pass it to the frontend to validate and verify email
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.json({
      message: 'Successfully logged in',
      token,
    })
  }
)

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true })
  res.json({ message: 'Logged out successfully' })
})

export default router
