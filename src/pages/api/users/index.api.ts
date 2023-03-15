import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

import { setCookie } from "nookies"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "POST") {

        const { name, username } = req.body;

        const userExists = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (userExists) {
            return res.status(HttpStatusCode.BadRequest).json({ message: "Username already exists" });
        }

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email: "",
                
            },
            select: {
                id: true,
                name: true,
                username: true,
                created_at: true,
            }
        });

        setCookie({ res }, "@ignitecall:userId", user.id, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return res.status(201).json(user);
    }
    return res.status(HttpStatusCode.MethodNotAllowed).end()
}