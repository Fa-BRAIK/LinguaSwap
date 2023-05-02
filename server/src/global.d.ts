import { User, Admin, PrismaClient } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            // Assuming we are protecting the route with a middleware
            user: User 

            // Assuming we are protecting the route with a middleware
            admin: Admin

            // After passing throug requires prisma middleware
            prisma: PrismaClient
        }
    }
}