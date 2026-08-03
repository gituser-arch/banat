import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import type { Product } from "@/types/product";
import { auth } from "@/auth";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Omit<Product, "id" | "createdAt" | "updatedAt">;
  const now = new Date().toISOString();
  const product: Product = {
    ...body,
    id: `p${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  const created = await createProduct(product);
  return NextResponse.json(created, { status: 201 });
}
