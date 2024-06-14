export { default } from "next-auth/middleware";

export const config = {
  // matcher: "/api/:path*",
  matcher: ["/dashboard/:path*", "/operations/:path*", "/new/:path*"],
};

// export async function middleware(req: Request) {
//   console.log("Middleware test!!!");
//   console.log(req.method);
//   console.log(req.url);
//   const origin = req.headers.get("origin");
//   console.log(origin);
//   const session = await getToken(req);
//   console.log("session ", session);

//   return NextResponse.next();
// }
