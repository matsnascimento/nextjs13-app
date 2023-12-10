import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

import { compare } from "bcrypt";
import axios from "axios";
import { JWT } from "next-auth/jwt";

import { JwtUtils, UrlUtils } from "../../../constants/Utils";

namespace NextAuthUtils {
  export const refreshToken = async function (refreshToken:any) {
    try {
      const response = await axios.post(
        UrlUtils.makeUrl(
          process.env.BACKEND_API_BASE as string,
          "openinsights_auth",
          "token",
          "refresh",
        ),
        {
          refresh: refreshToken,
        },
      );

      const { access, refresh } = response.data;

      // still within this block, return true
      return [access, refresh];
    } catch {
      return [null, null];
    }
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "AA0012", // Hex color value
    logo: "" // Absolute URL to logo image
  },
  pages: {
    signIn  : '/login',
    signOut : '/login',
    newUser : '/register'
  },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID as string,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      type: 'credentials',

      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Digite seu email",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Por favor, preenche o email e a senha");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password as string))) {
          throw new Error("Email ou senha inválido");
        }
        return user;
      },
      }),
  ],
  // callbacks: {
  //     async jwt({ token, user, account }) {
  //       // user just signed in
  //       if (account) {
  //         // may have to switch it up a bit for other providers
  //         if (account.provider === "google") {
  //           // extract these two tokens
  //           // const { access_token, id_token } = account;
  //           token.accessToken = account.access_token as string;
  //           token.id = account.id_token as string;
  
  //           // make a POST request to the DRF backend
  //           try {
  //             const response = await axios.post(
  
  //               // tip: use a seperate .ts file or json file to store such URL endpoints
  //               "http://localhost:3000/api/auth/signin/google",
  //               // UrlUtils.makeUrl(
  //               //   process.env.BACKEND_API_BASE as string,
  //               //   "openinsights_auth",
  //               //   "social",
  //               //   "login",
  //               //   account.provider
  //               // ),
  //               {
  //                 access_token: token.accessToken,
  //                 id_token: token.id,
  //               }
  //             );
  
  //             // extract the returned token from the DRF backend and add it to the `user` object
  //             const { access_token, refresh_token } = response.data;
              
  //             // reform the `token` object from the access token we appended to the `user` object
  //             token.accessToken = access_token;
  //             token.refreshToken = refresh_token;
  //             const role = 'client';
  //             return {
  //               ...token,
  //               role,
  //             } as JWT;
  //           } catch (error) {
  //             return token;
  //           }
  //         }
  //         else if (account.provider === "credentials") {
  //           // initial signin
  //           if (user && account) {
  //             token.email = user.email;
  //             token.name = user.name;
  //             token.id = user.id;
  //             token.image = user.image;
  //           }
  //         }
  //       }
  
  //       // user was signed in previously, we want to check if the token needs refreshing
  //       // token has been invalidated, try refreshing it
  //       console.log("166",token)
  //       if (JwtUtils.isJwtExpired(token.id as string)) {
  //         const [
  //           newAccessToken, newRefreshToken,
  //         ] = await NextAuthUtils.refreshToken(token.refreshToken);
  
  //         if (newAccessToken && newRefreshToken) {
  //           token.accessToken = newAccessToken;
  //           token.refreshToken = newRefreshToken;
  //           token.iat = Math.floor(Date.now() / 1000);
  //           token.iat = Math.floor(Date.now() / 1000 + 2 * 60 * 60);
  
  //           return token;
  //         }
  
  //         // unable to refresh tokens from DRF backend, invalidate the token
  //         token.exp = 0
  //         return token;
  //       }
  
  //       // token valid
  //       return token;
  //     },
  //   session: async ({ session, token, user }) => {
  //     // console.log("190");
  //     // console.log("session",session);
  //     // console.log("token",token);
  //     // console.log("user",user);
  //     if (session?.user) {
  //       session.user.id = token.sub;
  //     }
  //     const userData = await fetch(`${process.env.NEXTAUTH_URL}/api/user?userId=${session.user.id}`).then(response => response.json());
  //     session.user.subscriptionStatus = userData.subscriptionStatus;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
