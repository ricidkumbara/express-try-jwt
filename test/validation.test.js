import Joi from 'joi'
import { validate } from '../src/validations/validation.js'
import { ResponseError } from '../src/helpers/response-error.js'

describe('Validation Request', () => {  
    it('should be able validate request', () => {
        const request = {
            username: 'root',
            password: 'root'
        }

        const userSchemaa = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })

        const result = validate(userSchemaa, request)

        expect(result).toEqual(request)
        expect(result.error).toBeUndefined()
    })

    it('should response error if validate not pass', () => {
        const request = {}
        
        const userSchemaa = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })

        let error = null

        try {
            const result = validate(userSchemaa, request)
        } catch (e) {
            error = e
        }

        expect(error.status).toBe(400)
        expect(error.message).toBeDefined()
    })
})
