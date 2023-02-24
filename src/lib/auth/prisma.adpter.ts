import { Adapter } from "next-auth/adapters"
import { prisma } from "../prisma"

export function PrismaAdapter(): Adapter {
    return {
        async createUser(user) { },

        async getUser(id) {
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id
                }
            })

            return {
                avatar_url: user.avatar_url!,
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                emailVerified: null,
            }

        },

        async getUserByEmail(email) {
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    email
                }
            })

            return {
                avatar_url: user.avatar_url!,
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                emailVerified: null,
            }
        },

        async updateUser(user) { },

        async deleteUser(id) { },

        async linkAccount(id, provider, providerAccountId) { },

        async unlinkAccount(id, provider, providerAccountId) { },

        async createSession(user) { },

        async getSessionAndUser(sessionToken) { },

        async updateSession(session, force) { },

        async deleteSession(sessionToken) { },

        async createVerificationRequest(identifier, url, token, secret, provider) { },

        async useVerificationToken(identifier, token) { },
    }
}