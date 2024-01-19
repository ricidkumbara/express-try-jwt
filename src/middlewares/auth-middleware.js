import { prismaClient } from "../helpers/database.js"
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const authorization = req.get('Authorization')
    
    if (!authorization) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end()

        return
    }

    const tokens = authorization.split(' ')

    if (tokens.length !== 2) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end()

        return
    }

    let userId = null

    try {
        const jwtResult = jwt.verify(tokens[1], process.env.APP_SECRET)
        userId = jwtResult.id
    } catch (e) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end()
        
        return    
    }
    
    req.user = await prismaClient.user.findFirst({
        where: {
            id: userId
        }
    })

    if (!req.user) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end()
        
        return 
    }

    next()
}

export {
    authMiddleware
}