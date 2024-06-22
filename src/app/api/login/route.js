import { NextResponse } from "next/server";
import { prisma } from "@/core/libs/prisma";
import bcrypt from "bcryptjs";

import { generateToken, generateRefreshToken } from "@/core/libs/tokenManager";

export async function POST(request, response) {
  const data = await request.json();
  // console.log(data);

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      name: data.name,
    },
  });

  if (!user) {
    // Error
    return NextResponse.json({
      message: "User not found",
      status: 404,
      data: null,
      error: true,
      ok: false,
    });
  }

  const desencyptedPass = await bcrypt.compare(data.password, user.password);

  //   if (user.password !== data.password) {
  //     return NextResponse.json({ message: "Password is incorrect" });
  //   }
  if (!desencyptedPass) {
    return NextResponse.json({
      message: "Password is incorrect",
      status: 404,
      data: null,
      error: true,
      ok: false,
    });
  }

  // generate token
  const { token, expiredIn } = generateToken(user.id);
  if (!token) {
    return NextResponse.json({
      message: "Error generating token",
      status: 404,
      data: null,
      error: true,
      ok: false,
    });
  }
  // console.log("token", token);
  // console.log("expiredIn", expiredIn);
  // console.log("response", response);
  generateRefreshToken(user.id, response);

  const email = user.email;
  const userId = user.id;
  const name = user.name;

  // return NextResponse.json({ message: "User logged in" });
  return NextResponse.json({
    userId,
    email,
    name,
    token,
    expiredIn,
    ok: true,
    status: 200,
    error: false,
  });
}
