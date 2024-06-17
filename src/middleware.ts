export { default } from "next-auth/middleware";

// Middleware
// export async function middleware(req: Request) {
//   console.log("Middleware test!!!");
//   console.log(req.method);
//   console.log(req.url);
//   const origin = req.headers.get("origin");
//   console.log(origin);

//   return NextResponse.next();
// }

// Rutas protegidas
export const config = {
  // matcher: "/api/:path*",
  matcher: ["/dashboard/:path*", "/operations/:path*", "/new/:path*"],
};
