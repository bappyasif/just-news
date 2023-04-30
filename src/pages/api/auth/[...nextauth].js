import { authorizeUser } from "@/utils/loginWithCredentials";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import Google from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "john doe", value: "John Doe" },
                email: { label: "Email", type: "email", placeholder: "jaded@example.com", required: true },
                password: { label: "Password", type: "password", placeholder: "secret password goes here....", minlength: 4, required: true }
            },
            authorize: authorizeUser
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        session: async (session) => {
            session.session.user.sub = session.token.sub;
            session.session.user.jti = session.token.jti;

            return session.session
        }
    }
})