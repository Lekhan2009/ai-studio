` tags.

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        try {
            await connectMongoose();
            const sessionUser = await UserModel.findOne({ email: session.user?.email });

            if (sessionUser) {
              session.user = {
                ...session.user,
                id: sessionUser._id.toString(),
                avatarUrl: sessionUser.avatarUrl,
              };
            }
          } catch (error) {
            console.error("Session callback error:", error);
          }

        return session;
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        try {
            await connectMongoose();
            const sessionUser = await UserModel.findOne({ email: session.user?.email });

            if (sessionUser) {
              session.user = {
                ...session.user,
                id: sessionUser._id.toString(),
                avatarUrl: sessionUser.avatarUrl,
              };
            }
          } catch (error) {
            console.error("Session callback error:", error);
          }

        return session;
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        try {
            await connectMongoose();
            const sessionUser = await UserModel.findOne({ email: session.user?.email });

            if (sessionUser) {
              session.user = {
                ...session.user,
                id: sessionUser._id.toString(),
                avatarUrl: sessionUser.avatarUrl,
              };
            }
          } catch (error) {
            console.error("Session callback error:", error);
          }

        return session;
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        return {
          ...session,
          user: {
            id: sessionUser?.id || sessionUser?._id || '',
            name: session?.user?.name || sessionUser?.name || '',
            email: session?.user?.email || sessionUser?.email || '',
            avatarUrl: sessionUser?.avatarUrl || session?.user?.image || '',
          },
        }
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        return {
          ...session,
          user: {
            id: sessionUser?.id || sessionUser?._id || '',
            name: session?.user?.name || sessionUser?.name || '',
            email: session?.user?.email || sessionUser?.email || '',
            avatarUrl: sessionUser?.avatarUrl || session?.user?.image || '',
          },
        }
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
    async session({ session }) {
      try {
        await connectMongoose();
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        if (sessionUser) {
          session.user = {
            ...session.user,
            id: sessionUser._id.toString(),
            avatarUrl: sessionUser.avatarUrl,
          };
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

```
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
      async session({ session }) {
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        return {
          ...session,
          user: {
            id: sessionUser?.id || sessionUser?._id || '',
            name: session?.user?.name || sessionUser?.name || '',
            email: session?.user?.email || sessionUser?.email || '',
            avatarUrl: sessionUser?.avatarUrl || session?.user?.image || '',
          },
        }
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}
```

The final code:
```typescript
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
      async session({ session }) {
        const sessionUser = await UserModel.findOne({ email: session.user?.email });

        return {
          ...session,
          user: {
            id: sessionUser?.id || sessionUser?._id || '',
            name: session?.user?.name || sessionUser?.name || '',
            email: session?.user?.email || sessionUser?.email || '',
            avatarUrl: sessionUser?.avatarUrl || session?.user?.image || '',
          },
        }
      },

    async signIn({ user }: { user: User }) {
      try {
        await connectMongoose();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
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
}