import { NextResponse } from "next/server";
import { prisma } from "@/core/libs/prisma";
import bcrypt from "bcryptjs";

import { generateToken, generateRefreshToken } from "@/core/libs/tokenManager";

export async function POST(request, response) {
  const data = await request.json();
  console.log(data);

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
    });
  }

  const desencyptedPass = await bcrypt.compare(data.password, user.password);

  //   if (user.password !== data.password) {
  //     return NextResponse.json({ message: "Password is incorrect" });
  //   }
  if (!desencyptedPass) {
    return NextResponse.json({ message: "Password is incorrect" });
  }

  // generate token
  const { token, expiredIn } = generateToken(user.id);
  if (!token) {
    return NextResponse.json({ message: "Error generating token" });
  }
  // console.log("token", token);
  // console.log("expiredIn", expiredIn);
  // console.log("response", response);
  generateRefreshToken(user.id, response);

  const email = data.email;

  // return NextResponse.json({ message: "User logged in" });
  return NextResponse.json({ email, token, expiredIn });
}
