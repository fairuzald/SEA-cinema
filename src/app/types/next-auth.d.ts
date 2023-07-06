import { ISODateString, type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      name: string;
      username: string;
      age: number;
      balance: number;
      telephoneNumber: string;
      createdAt: ISODateString;
      updatedAt: ISODateString;
      favoritedMovies: Movie[];
    } & DefaultSession["user"];
  }
  /**
   * User
   */
  
}
