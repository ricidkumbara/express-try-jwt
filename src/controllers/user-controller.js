import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../helpers/database.js'
import { ResponseError } from '../helpers/response-error.js'
import { validate } from '../validations/validation.js'
import { 
    loginUserValidation,
    registerUserValidation, 
    updateUserValidation
} from '../validations/user-validation.js'

const test = async (req, res, next) => {
    res.send({ code: 200 })
}

const register = async (req, res, next) => {
    try {
        const request = validate(registerUserValidation, req.body)
        const userIsExist = await prismaClient.user.findFirst({ 
            where: { 
                email: request.email 
            } 
        })

        if (userIsExist) {
            throw new ResponseError(400, 'User already exist')
        }

        request.password = await bcrypt.hash(request.password, 10)
        request.created_at = new Date()

        const user = await prismaClient.user.create({
            data: request,
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        res.send({ code: 200, data: { user } })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = validate(loginUserValidation, req.body)
        const email = request.email
        const password = request.password

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        })

        if (!user) {
            throw new ResponseError(400, 'Email or password wrong')
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new ResponseError(400, 'Email or password wrong')
        }

        const token = 'Bearer ' + jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, process.env.APP_SECRET, {
            expiresIn: (60 * 60 * 24)
        })

        res.send({ 
            code: 200,
            data: {
                token
            } 
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const request = validate(updateUserValidation, req.body)
        request.updated_at = new Date()
        
        const user = await prismaClient.user.update({
            where: {
                id: req.user.id
            },
            data: request,
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true
            }
        })

        res.status(200).json({
            code: 200,
            data: {
                ...user
            }
        })
    } catch (e) {
        next(e)
    }
}

export default {
    test,
    register,
    login,
    update
}