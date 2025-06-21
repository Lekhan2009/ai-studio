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
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await User.findOne({ email: session.user?.email });
        
        if (sessionUser) {
          session.user = {
            ...session.user,
            // You can define and make sure that id is part of the user structure, 
            // or avoid adding it if not necessary.
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
        
        const userExists = await User.findOne({ email: user.email });
        
        if (!userExists) {
          await User.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
        }
        
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Export GET and POST handlers
export { handler as GET, handler as POST };
