import { prisma } from "@/core/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

// Obtener la lista de operaciones
export async function GET() {
  const operations = await prisma.operations.findMany();

  return NextResponse.json(operations);
}

// Nueva Operación
export async function POST(request: NextRequest) {
  const data = await request.json();
  // console.log(data);

  if (data.userId && data.userId !== null && data.title) {
    // console.log("POST /operation new");
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
  } else {
    if (data.userId && data.userId !== null) {
      // console.log("POST /operation list by userId");
      const operations = await prisma.operations.findMany({
        where: {
          userId: data.userId,
        },
      });

      // console.log(operations);
      return NextResponse.json(operations);
    } else {
      return NextResponse.json([]);
    }
  }
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
