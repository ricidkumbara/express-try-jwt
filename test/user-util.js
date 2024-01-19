import { prismaClient } from "../src/helpers/database"
import bcrypt from 'bcrypt'

export const getSampleUser = () => {
    return {
        email: "test@gmail.com",
        password: "test",
        name: "TEST",
    }
}

export const createSampleUser = async () => {
    const data = getSampleUser()
    data.password = await bcrypt.hash(data.password, 10)

    return prismaClient.user.create({
        data: data
    })
}

export const deleteSampleUser = async () => {
    return prismaClient.user.deleteMany({
        where: {
            email: (getSampleUser()).email
        }
    })
}