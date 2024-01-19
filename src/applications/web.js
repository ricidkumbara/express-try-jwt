import express from 'express'
import { userRouter } from '../routers/user.js'
import { errorMiddleware } from '../middlewares/error-middleware.js'

const web = express()

web.use(express.json())
web.use(userRouter)
web.use(errorMiddleware)

export {
    web
}