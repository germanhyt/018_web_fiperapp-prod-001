import { prisma } from "@/core/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

// Obtener la lista de operaciones
export async function GET() {
  const operations = await prisma.operations.findMany();
  // console.log(operations);

  return NextResponse.json(operations);
}

// Nueva Operación
export async function POST(request: NextRequest) {
  const data = await request.json();

  const operation = await prisma.operations.create({
    data: {
      title: data.title,
      description: data.description,
      mount: data.mount,
      operationtypeId: data.operationtypeId,
      userId: data.userId,
    },
  });

  return NextResponse.json({ message: "POST /operation " + operation.id });
}

// Obtener la lista de operaciones por IdUsuario
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const userId = searchParams.get("userId");
//   console.log(userId);

//   const operations = await prisma.operations.findMany({
//     where: {
//       userId: Number(userId),
//     },
//   });

//   return NextResponse.json(operations);
// }
