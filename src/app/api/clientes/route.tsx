"use server";

import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/ApiHandler";
import { sql } from "@vercel/postgres";

export async function POST(
  nome:string,
  CPF:number,
): Promise<NextResponse> {
  try {
    const rows = sql`INSERT INTO cliente (nome, CPF) VALUES (${nome}, ${CPF})`;
    return ApiHandler.ResponseToJson(rows, 201);
} catch (error) {
  return ApiHandler.ResponseToJson(error, 500);
}
}


export async function GET() {
  return sql`SELECT * FROM cliente`;
}