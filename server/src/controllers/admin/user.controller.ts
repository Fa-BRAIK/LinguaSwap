import { Request, Response } from 'express'
import { genSalt, hash } from 'bcrypt'
import { NotFoundError } from '#errors/not-found.error.js'

const generateData = async (req: Request) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    email_validated_at: req.body.email_validated_at,
    phone_number: req.body.phone_number,
    phone_number_verified_at: req.body.phone_number_verified_at,
    salt: undefined as string | undefined,
    password: undefined as string | undefined,
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
    availability: req.body.availability,
  }

  if (req.body.password) {
    const salt = await genSalt()
    const password = await hash(req.body.password, salt)

    data.salt = salt
    data.password = password
  }

  return data
}

const index = async (req: Request, res: Response) => {}

const store = async (req: Request, res: Response) => {
  const salt = await genSalt()
  const password = await hash(req.body.password, salt)

  const user = await req.prisma.user.create({
    data: await generateData(req),
  })

  delete user.password, delete user.salt

  res.status(201).json({
    messages: ['User successfully created'],
    data: {
      user,
    },
  })
}

const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const exists = await req.prisma.user.count({
    where: { id },
  })

  if (!exists) {
    throw new NotFoundError('User not found!')
  }

  const user = await req.prisma.user.update({
    where: { id },
    data: await generateData(req),
  })

  res.status(200).json({
    messages: ['User successfully updated!'],
    data: {
      user,
    },
  })
}

const remove = async (req: Request, res: Response) => {}

const read = async (req: Request, res: Response) => {}

export default {
  index,
  store,
  update,
  remove,
  read,
}
