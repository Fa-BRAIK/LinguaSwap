import { LoginError } from '#errors/login.error.js';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { compare } from 'bcrypt'

const prisma = new PrismaClient() 

const login = async (req: Request, res: Response) => {
    const user = await prisma.admin.findFirst({
        where: { email: req.body.email }
    })

    if (!user) {
        throw new LoginError(401, 'Incorrect credentials')
    }

    const correctCredentials = await compare(req.body.password, user.password)

    if (!correctCredentials) {
        throw new LoginError(401, 'Incorrect credentials')
    }

    res.status(200).json({
        user: user
    })
}

export default {
    login
}
