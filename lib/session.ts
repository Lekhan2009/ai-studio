import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoose } from "./mongodb";
import UserModel from "@/models/User";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist custom user info into token
      if (user) {
        token.id = (user as any).id;
        token.avatarUrl = (user as any).avatarUrl;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach custom fields from token to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.avatarUrl = token.avatarUrl as string;
      }
      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
          user.id = newUser._id.toString();
          user.avatarUrl = newUser.avatarUrl;
        } else {
          user.id = existingUser._id.toString();
          user.avatarUrl = existingUser.avatarUrl;
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session as SessionInterface;
};
