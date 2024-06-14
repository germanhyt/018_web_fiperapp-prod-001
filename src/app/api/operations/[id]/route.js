import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const operation = await prisma.operations.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!operation) {
    return NextResponse.error({
      status: 404,
      message: "Operation not found",
    });
  }

  return NextResponse.json(operation);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  // console.log("BACK1 ", data);
  const operation = await prisma.operations.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: data.title,
      description: data.description,
      mount: data.mount,
      operationtypeId: data.operationtypeId,
    },
  });

  return NextResponse.json(operation);
}

export async function DELETE(request, { params }) {
  await prisma.operations.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json({ success: true });
}
