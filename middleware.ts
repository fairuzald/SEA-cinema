export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/transactions", "/watchlist", "/profile", "/booking"],
};
