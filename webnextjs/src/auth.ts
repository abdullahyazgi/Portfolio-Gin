import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SigninSchema } from "./lib/validationSchemas";
import * as bcrypt from "bcryptjs";

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      async authorize(data) {
        const validation = SigninSchema.safeParse(data);
        if(validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({ where: { email: email } });
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            return user;
          }
        }
        return null;
      }
    })
  ],
})