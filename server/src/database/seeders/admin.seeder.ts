import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'
import chalk from 'chalk'

const prisma = new PrismaClient()

const main = async () => {
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

    console.log(
        chalk.white.bgGreen(
            `Admin account ${email} created with password : ${unhashedPassword}`
        )
    )
}

const generatePassword = (length: number): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-?%$&()!'
    
    let password = ''

    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }
    
    return password
}

main()
    .then(async () => {
        await prisma.$disconnect()
        process.exit(0)
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })