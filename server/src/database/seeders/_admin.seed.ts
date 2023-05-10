import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'

const prisma = new PrismaClient()

// Used for testing
export const createAdmin = async () => {
    const email = 'admin@farouk.ca'
    const unhashedPassword = generatePassword(8)
    const salt = await genSalt()
    const password = await hash(unhashedPassword, salt)

    await prisma.admin.upsert({
        where: { email },
        update: { salt, password },
        create: {
            email,
            name: 'Super admin',
            salt,
            password
        }
    })

    return {
        email,
        password: unhashedPassword
    }
}

const generatePassword = (length: number): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-?%$&()!'
    
    let password = ''

    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }
    
    return password
}