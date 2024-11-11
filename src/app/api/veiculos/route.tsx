"use server";

import { sql } from "@vercel/postgres";

export async function POST(
  placa:string,
  modelo:string,
  cor:string,
  cliente_id: number
) {
  try {
    const rows = await sql`INSERT INTO veiculo (placa, modelo, cor, cliente_id) VALUES (${placa}, ${modelo}, ${cor}, ${cliente_id})`;
    return rows.rows;
} catch (error) {
  return error;
}
}

export async function GET() {
  const result = await sql`SELECT veiculo.*, cliente.nome FROM veiculo INNER JOIN cliente ON veiculo.cliente_id = cliente.id`;
  return result.rows;
}

export async function DELETE(id:number) {
  const result = await sql`DELETE FROM veiculo WHERE id = ${id}`;
  return result.rows;
}