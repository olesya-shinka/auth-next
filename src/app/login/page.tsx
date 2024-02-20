import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import Link from "next/link";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`https://fakestoreapi.com/auth/token/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(`https://fakestoreapi.com/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

// const Login = () => {
//   const signin = async () => {
//     const res = await fetch(`https://fakestoreapi.com/auth/login`, {
//       method: "POST",
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       alert(res.statusText);
//       return;
//     }
//     const response = await res.json();
//     alert("Пользователь залогинен!");
  
//   };
//   return (
//     <div>
//       <div>Sign in</div>
//       <div>
//         <input name="name" placeholder="Name" required value={name}/>
//         <input
//           name="password"
//           placeholder="password"
//           type="password"
//           required
//         />
//         <div>
//           <button onClick={Login}>Войти</button>
//           <Link href={"/"}>Отмена</Link>
//         </div>
//       </div>
//     </div>
//   );
// };
