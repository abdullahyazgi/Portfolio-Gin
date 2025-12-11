import NextAuth from "next-auth"
 
const { handlers, auth } = NextAuth({
  providers: [],
});

export { handlers, auth };