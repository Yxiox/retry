"use server";

import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/ApiHandler";
import { sql } from "@vercel/postgres";

export async function POST(
  usuario:string,
  senha:string,
): Promise<NextResponse> {
  try {
    const rows = sql`INSERT INTO user (username, password) VALUES (${usuario}, ${senha})`;
    return ApiHandler.ResponseToJson(rows, 201);
} catch (error) {
  return ApiHandler.ResponseToJson(error, 500);
}
}


export async function GET() {
const result = await sql`SELECT * FROM users`;
  return {rows: result.rows.map((row)=>({
    id:row.id,
    username:row.username,
    password:row.password
  }))}
}