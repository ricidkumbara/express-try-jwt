import supertest from "supertest"
import { web } from "../src/applications/web.js"
import { createSampleUser, deleteSampleUser, getSampleUser } from "./user-util.js";
import { prismaClient } from "../src/helpers/database.js";

describe('GET /api/v1/users/test', () => {
    it('should be able to test', async () => {
        const result = await supertest(web)
            .get('/api/v1/users/test');

        expect(result.status).toBe(200)
        expect(result.body.errors).toBeUndefined()
    })
})

describe('POST /api/v1/users/register', () => {
    afterAll(async () => {
        await prismaClient.user.deleteMany({
            where: {
                email: (getSampleUser()).email
            }
        })
    })

    it('should be able to register', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/register')
            .send(getSampleUser())

        expect(result.status).toBe(200)
        expect(result.body.data).toBeDefined()
    })

    test('should be reject if payload is empty', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/register')
            .send({})

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should be reject if payload is not filled', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/register')
            .send({
                email: "",
                password: "",
                name: ""
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should be reject if user is already register', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/register')
            .send(getSampleUser())

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('POST /api/v1/users/login', () => {
    beforeAll(async () => {
        await createSampleUser()
    })

    afterAll(async () => {
        await deleteSampleUser()
    })

    it('should be able to login', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                email: (getSampleUser()).email,
                password: (getSampleUser()).password
            })

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
    })

    it('should reject if email or password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                email: 'xxxxx',
                password: 'xxxxx'
            })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                email: (getSampleUser()).email,
                password: 'xxxxx'
            })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if payload is empty', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                email: '',
                password: ''
            })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('PUT /api/v1/users', () => {
    let token = null
    
    beforeAll(async () => {
        await createSampleUser()

        const loginReponse = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                email: (getSampleUser()).email,
                password: (getSampleUser()).password
            })

        token = loginReponse.body.data.token
    })

    afterAll(async () => {
        await deleteSampleUser()
    })

    it('should be able to update with token', async () => {
        const result = await supertest(web)
            .put('/api/v1/users')
            .set('Authorization', token)
            .send({
                name: "TEST UPDATE"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe('TEST UPDATE')
    })

    it('should be reject if token is invalid', async () => {
        const result = await supertest(web)
            .put('/api/v1/users')
            .set('Authorization', token + 'xxxxx')
            .send({
                name: "TEST UPDATE"
            })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should be reject if token is empty', async () => {
        const result = await supertest(web)
            .put('/api/v1/users')
            .send({
                name: "TEST UPDATE"
            })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should be reject if token is missmatch', async () => {
        const result = await supertest(web)
            .put('/api/v1/users')
            .set('Authorization', 'xxxxx')
            .send({
                name: "TEST UPDATE"
            })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should be reject data is empty', async () => {
        const result = await supertest(web)
            .put('/api/v1/users')
            .set('Authorization', token)
            .send({
                name: ""
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})
