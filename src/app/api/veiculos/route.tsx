import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/ApiHandler";
import { sql } from "@vercel/postgres";

export async function POST(
  placa:string,
  modelo:string,
  cor:string,
  cliente_id: number
): Promise<NextResponse> {
  try {
    const rows = sql`INSERT INTO veiculo (placa, modelo, cor, cliente_id) VALUES (${placa}, ${modelo}, ${cor}, ${cliente_id})`;
    return ApiHandler.ResponseToJson(rows, 201);
} catch (error) {
  return ApiHandler.ResponseToJson(error, 500);
}
}


export async function GET() {
  return sql`SELECT v.placa, v.modelo, v.cor, c.nome FROM veiculo AS v INNER JOIN cliente as c ON v.cliente_id = c.id`;
}