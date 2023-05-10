import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'
import { createAdmin } from './_admin.seed.js'

const prisma = new PrismaClient()

export const main = async () => {
    const { email, password } = await createAdmin()

    console.log(
        chalk.white.bgGreen(
            `Admin account ${email} created with password : ${password}`
        )
    )
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