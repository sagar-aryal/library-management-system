import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import movieRouter from './routers/movie'
import bookRouter from './routers/book'
import userRouter from './routers/user'
import authorRouter from './routers/author'
import authRouter from './routers/auth'
import loginWithGoogle from './passport.ts/google'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(cookieParser())
app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
