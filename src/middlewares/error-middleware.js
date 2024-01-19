import { ResponseError } from '../helpers/response-error.js'

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end()
    } else {
        console.log(err.message)
        res.status(500).end();
    }
}

export {
    errorMiddleware
}