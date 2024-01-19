import { ResponseError } from "../src/helpers/response-error.js"

describe('Reponse error', () => {
    it('should be able to handle error', () => {
        const responseError = new ResponseError();
        let error = null

        try {
            throw new ResponseError(400, 'Ups, something went wrong')
        } catch (e) {
            error = e
        }

        expect(error.status).toBe(400)
        expect(error.message).toBe('Ups, something went wrong')
        expect(error.data).toBeUndefined()
        expect(error instanceof Error).toBeTruthy()
    })
})