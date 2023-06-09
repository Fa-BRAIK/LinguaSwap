import { Request, Response } from 'express'
import { genSalt, hash } from 'bcrypt'
import { NotFoundError } from '#errors/not-found.error.js'
import HttpStatusCode from '#enums/http-statuses.enum.js'
import { EntityExistsError } from '#errors/entity-exists.error.js'
import { check } from 'express-validator'

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

const checkUniqueEmail = async (req: Request, email: string, user_id: number|null = null) => { 
  const user = await req.prisma.user.findFirst({
    where: { email },
  })
  
  if (user && user.id !== user_id) {
    throw new EntityExistsError('Email already exists!')
  }
}

const checkUniquePhoneNumber = async (req: Request, phoneNumber: string, user_id: number|null = null) => {
  const user = await req.prisma.user.findFirst({
    where: { phone_number: phoneNumber },
  })
  
  if (user && user.id !== user_id) {
    throw new EntityExistsError('Phone number already exists!')
  }
}

const checkUser = async (req: Request, id: number) => {
  const exists = await req.prisma.user.count({
    where: { id },
  })

  if (!exists) {
    throw new NotFoundError('User not found!')
  }
}

const index = async (req: Request, res: Response) => {}

const store = async (req: Request, res: Response) => {
  const data = await generateData(req)

  await checkUniqueEmail(req, req.body.email)

  if (req.body.phone_number) {  
    await checkUniquePhoneNumber(req, req.body.phone_number)
  }

  const user = await req.prisma.user.create({
    data,
  })

  delete user.password, delete user.salt

  res.status(HttpStatusCode.CREATED).json({
    messages: ['User successfully created'],
    data: {
      user,
    },
  })
}

const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await checkUniqueEmail(req, req.body.email, id)

  if (req.body.phone_number) {
    await checkUniquePhoneNumber(req, req.body.phone_number, id)
  }

  await checkUser(req, id)

  const user = await req.prisma.user.update({
    where: { id },
    data: await generateData(req),
  })

  res.status(HttpStatusCode.OK).json({
    messages: ['User successfully updated!'],
    data: {
      user,
    },
  })
}

const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await checkUser(req, id)

  const user = await req.prisma.user.delete({
    where: { id },
  })

  res.status(HttpStatusCode.OK).json({
    messages: ['User successfully deleted!'],
    data: {
      user,
    },
  })
}

const read = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await checkUser(req, id)

  const user = await req.prisma.user.findFirst({
    where: { id },
  })

  res.status(HttpStatusCode.OK).json({
    messages: ['User successfully retrieved!'],
    data: {
        user
    }
  })
}

export default {
  index,
  store,
  update,
  remove,
  read,
}
