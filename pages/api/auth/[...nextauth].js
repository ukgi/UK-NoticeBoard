import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDatabase } from "@/helpers/db-util";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
  adapter: MongoDBAdapter(connectDatabase()),
};

export default NextAuth(authOptions);
