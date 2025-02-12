/* eslint-disable @typescript-eslint/ban-ts-comment */
import getUserService from "@/modules/ioc/get-user-service";
import GoogleProvider from "next-auth/providers/google";

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
    //@ts-ignore
    async signIn({ user }): Promise<boolean> {
      const userService = getUserService();

      const isAllowedUser = await userService.isAnAllowedUser(user.email);

      if (isAllowedUser) {
        const userCreated = await userService.createUserIfNotExists(user);
        return !!userCreated;
      }

      return false;
    },
    //TODO: fix types
    //@ts-ignore
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
};
