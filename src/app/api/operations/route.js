import { NextResponse } from "next/server";
import { prisma } from "@/core/libs/prisma";

export async function GET() {
  const operations = await prisma.operations.findMany();
  // console.log(operations);

  return NextResponse.json(operations);
}

export async function POST(request) {
  const data = await request.json();

  const operation = await prisma.operations.create({
    data: {
      title: data.title,
      description: data.description,
      mount: data.mount,
      operationtypeId: data.operationtypeId,
    },
  });

  return NextResponse.json({ message: "POST /operation " + operation.id });
}
