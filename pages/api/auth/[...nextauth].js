import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectDatabase, findByEmail } from '@/helpers/db-util';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),

    CredentialsProvider({
      // 1. 로그인페이지 폼을 자동생성해주는 코드
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'password', type: 'password' },
      },

      // 2. 로그인 요청시, 실행되는 코드
      async authorize(credentials, req) {
        const client = await connectDatabase();
        const user = await findByEmail(client, credentials.email);
        if (!user) {
          console.log('해당 이메일은 없습니다...');
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비밀번호가 틀렸습니다...');
          return null;
        }

        return user;
      },
    }),
  ],

  // jwt 토큰 방식 + 만료일 설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // jwt 생성 시, 실행되는 코드
    // user 변수는 DB의 유저정보, token.user를 통해 jwt에 저장할 데이터를 생성할 수 있음

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    // 유저 세션이 조회될 때마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDatabase()),
};

export default NextAuth(authOptions);
