import { User, Admin } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            // Assuming we are protecting the route with a middleware
            user: User 

            // Assuming we are protecting the route with a middleware
            admin: Admin
        }
    }
}