import { PrismaClient } from '@prisma/client'


export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        },
        {
            emit: 'event',
            level: 'error'
        },
        {
            emit: 'event',
            level: 'info'
        },
        {
            emit: 'event',
            level: 'warn'
        }
    ]
})

prismaClient.$on('error', (e) => {
    console.log(e)
})

prismaClient.$on('warn', (e) => {
    console.log(e)
})

prismaClient.$on('info', (e) => {
    console.log(e)
})

prismaClient.$on('query', (e) => {
    console.log(e)
})