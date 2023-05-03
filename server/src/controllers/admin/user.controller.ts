import { Request, Response } from 'express'
import { genSalt, hash } from 'bcrypt'

const index = async (req: Request, res: Response) => {}

const store = async (req: Request, res: Response) => {
    const salt = await genSalt()
    const password = await hash(req.body.password, salt)

    const user = await req.prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            email_validated_at: req.body.email_validated_at,
            phone_number: req.body.phone_number,
            phone_number_verified_at: req.body.phone_number_verified_at,
            salt,
            password,
            // profile_image: req.body.profile_image,
            // cover_image: req.body.cover_image,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            introduction: req.body.introduction,
            occupation: req.body.occupation,
            interests: req.body.interests,
            hobbies: req.body.hobbies,
            website: req.body.website,
            language_practice_preferences: req.body.language_practice_preferences,
            availability: req.body.availability
        }
    })

    delete user.password, delete user.salt

    res.status(201).json({
        messages: ['User successfully created'],
        data: {
            user
        }
    })
}

const update = async (req: Request, res: Response) => {}

const remove = async (req: Request, res: Response) => {}

const read = async (req: Request, res: Response) => {}

export default {
    index,
    store,
    update,
    remove, 
    read
}
