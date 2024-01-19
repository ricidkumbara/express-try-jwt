import express from "express"
import userController from "../controllers/user-controller.js"
import { authMiddleware } from "../middlewares/auth-middleware.js"

const userRouter = new express.Router()

userRouter.get('/api/v1/users/test', userController.test)
userRouter.post('/api/v1/users/register', userController.register)
userRouter.post('/api/v1/users/login', userController.login)

userRouter.use(authMiddleware)
userRouter.put('/api/v1/users', userController.update)

export {
    userRouter
}