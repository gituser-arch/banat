import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";
import { auth } from "@/auth";
import type { Order } from "@/types/order";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">;
  const now = new Date().toISOString();
  const order: Order = {
    ...body,
    id: `o${Date.now()}`,
    orderNumber: `BH-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const created = await createOrder(order);
  return NextResponse.json(created, { status: 201 });
}
