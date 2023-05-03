import HttpStatusCode from '#enums/http-statuses.enum.js'
import { validationHandler } from '#handlers/validator.handler.js'
import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'
import moment from 'moment'

const validateGenericUserForm = (): ValidationChain[] => [
  body('name').notEmpty(),
  body('email').trim().isEmail(),
  body('email_validated_at').optional().isDate(),
  body('phone_number')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 9, max: 15 }),
  body('phone_number_verified_at').optional().isDate(),
  body('profile_image').optional(),
  body('cover_image').optional(),
  body('gender').optional().isIn(['MALE', 'FEMALE']),
  body('date_of_birth').optional().isDate().isBefore(moment().toString()),
  body('introduction').optional().isString().isLength({ max: 5000 }),
  body('occupation').optional().isString().isLength({ max: 50 }),
  body('interests').optional().isString().isLength({ max: 5000 }),
  body('hobbies').optional().isString().isLength({ max: 5000 }),
  body('website').optional().trim().isURL(),
  body('language_practice_preferences')
    .optional()
    .isString()
    .isLength({ max: 5000 }),
  body('availablitiy').optional().isString().isLength({ max: 5000 }),
]

export const validateUpdateUser =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
      ...validateGenericUserForm(),
      body('password').optional().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }),
      body('password_confirmation').equals(req.body.password),
    ]

    const errors = await validationHandler(req, validations)

    if (!errors) {
      return next()
    }

    res
      .status(HttpStatusCode.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() })
  }

export const validateStoreUser =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
      ...validateGenericUserForm(),
      body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }),
      body('password_confirmation').equals(req.body.password),
    ]

    const errors = await validationHandler(req, validations)

    if (!errors) {
      return next()
    }

    res
      .status(HttpStatusCode.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() })
  }
