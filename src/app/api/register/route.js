import { NextResponse } from "next/server";
import { prisma } from "@/core/libs/prisma";
import bcrypt from "bcryptjs";
import { ok } from "assert";

export async function POST(request) {
  const data = await request.json();
  console.log(data);

  // Encrypt password - https://www.izertis.com/es/-/blog/encriptacion-de-password-en-nodejs-y-mongodb-bcrypt
  // El salto (o "salt" en inglés) es una cadena aleatoria que se concatena con la contraseña antes de aplicar el algoritmo de hash
  // Este procedimiento mejora la seguridad del hash resultante, haciendo que sea más resistente a los ataques de fuerza bruta y a las tablas de búsqueda de contraseñas.
  const salt = await bcrypt.genSalt(10); // indica que se utilizará un costo de 10, lo que significa que el algoritmo de hash se aplicará 2^10 (1024) veces
  const encryptedPass = await bcrypt.hash(data.password, salt);

  if (!encryptedPass) {
    return NextResponse.json({ message: "Password not encrypted" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    return NextResponse.json({ message: "User already exists", ok: false });
  }

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: encryptedPass,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found", ok: false });
  }

  return NextResponse.json({ message: "POST /users " + user.idm, ok: true });
}
