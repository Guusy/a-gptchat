import getUserService from "@/modules/ioc/get-user-service";
import GoogleProvider from "next-auth/providers/google";

// TODO: use persist data and fix types of callbacks
const whitelistedEmails = [ "" ];
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      if (whitelistedEmails.includes(user.email)) {
        const userService = getUserService();
        const userCreated = await userService.createUserIfNotExists(user);
        return !!userCreated;
      }

      return false;
    },
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
};
