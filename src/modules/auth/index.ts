import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Notion from "next-auth/providers/notion";
import { createClient } from "@libsql/client";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/libsql";

// import { db } from "@/db";
import { Accounts, Users } from "@/db/schema";

// TODO : Implement the account linking

// TODO : Change here when deploying to production
const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    // authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: Users,
        accountsTable: Accounts,
    }),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        Google,
        Notion({
            clientId: process.env.AUTH_NOTION_ID!,
            clientSecret: process.env.AUTH_NOTION_SECRET!,
            redirectUri: process.env.AUTH_NOTION_REDIRECT_URI!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
});
