import { NextApiRequest, NextApiResponse } from "next"
import { Adapter } from "next-auth/adapters"
import { destroyCookie, parseCookies } from "nookies"
import { prisma } from "../prisma"

export function PrismaAdapter(
    req: NextApiRequest,
    res: NextApiResponse
): Adapter {
    return {
        async createUser(user) {
            const { "@ignitecall:userId": userIdOnCookies } = parseCookies({ req })

            if (!userIdOnCookies) {
                throw new Error("User not found")
            }

            const prismaUser = await prisma.user.update({
                where: {
                    id: userIdOnCookies
                },
                data: {
                    id: userIdOnCookies,
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                }
            })

            destroyCookie({ res }, "@ignitecall:userId", {
                path: "/",
            })

            return {
                id: prismaUser.id,
                avatar_url: prismaUser.avatar_url!,
                email: prismaUser.email,
                name: prismaUser.name,
                username: prismaUser.username,
                emailVerified: null,
            }
        },

        async getUser(id) {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if (!user) {
                return null
            }

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
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return null
            }

            return {
                avatar_url: user.avatar_url!,
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                emailVerified: null,
            }
        },

        async getUserByAccount({ provider, providerAccountId }) {
            const account = await prisma.account.findUnique({
                where: {
                    provider_provider_account_id: {
                        provider,
                        provider_account_id: providerAccountId
                    }
                },
                include: {
                    user: true
                }
            })

            if (!account) {
                return null
            }

            const user = account.user

            return {
                avatar_url: user.avatar_url!,
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                emailVerified: null,

            }

        },

        async updateUser(user) {
            const prismaUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                }
            })

            return {
                avatar_url: prismaUser.avatar_url,
                email: prismaUser.email,
                id: prismaUser.id,
                name: prismaUser.name,
                username: prismaUser.username,
                emailVerified: null,

            }
        },

        async linkAccount(account) {
            await prisma.account.create({
                data: {
                    
                    user_id: account.userId,
                    type: account.type,
                    provider: account.provider,
                    provider_account_id: account.providerAccountId,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                }
            })
        },

        async unlinkAccount(account) { },

        async createSession({ sessionToken, userId, expires }) {
            await prisma.session.create({
                data: {
                    user_id: userId,
                    expires,
                    sessionToken,
                }
            })

            return {
                sessionToken,
                userId,
                expires
            }
        },

        async getSessionAndUser(sessionToken) {
            const session = await prisma.session.findUnique({
                where: {
                    sessionToken
                },
                include: {
                    user: true
                }
            })

            if (!session) {
                return null
            }

            const user = session.user

            return {
                session: {
                    userId: session.user_id,
                    expires: session.expires,
                    sessionToken: session.sessionToken,
                },
                user: {
                    avatar_url: user.avatar_url,
                    email: user.email,
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    emailVerified: null,
                }
            }
        },

        async updateSession({ sessionToken, expires, userId }) {
            const prismaSession = await prisma.session.update({
                where: {
                    sessionToken
                },
                data: {
                    expires,
                    user_id: userId
                }
            })

            return {
                sessionToken: prismaSession.sessionToken,
                userId: prismaSession.user_id,
                expires: prismaSession.expires
            }
        },

        async deleteSession(sessionToken) {
            await prisma.session.delete({
                where: {
                    sessionToken
                }
            })
        }

    }
}