import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoose } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "/logo.svg", // optional logo
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await User.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }) {
      try {
        await connectMongoose();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
            projects: [],
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/", // optional custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
