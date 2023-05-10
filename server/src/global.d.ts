import { User, Admin, PrismaClient } from '@prisma/client'
import { Logger } from 'winston'

declare global {
    namespace Express {
        interface Request {
            // Assuming we are protecting the route with a middleware
            user: User 

            // Assuming we are protecting the route with a middleware
            admin: Admin

            // After passing through requires prisma middleware
            prisma: PrismaClient

            // After passing through logged middleware
            logger: Logger
        }
    }
}