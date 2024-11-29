"use server";

import { sql } from "@vercel/postgres";

export async function POST(
  nome:string,
  CPF:number,
) {
  try {
    const rows = await sql`INSERT INTO cliente (nome, cpf) VALUES (${nome}, ${CPF})`;
    return rows.rows;
} catch (error) {
  return error;
}
}

export async function GET() {
  const result = await sql`SELECT * FROM cliente`;
  return result.rows;
}

export async function UPDATE(id:number, nome:string, cpf:number) {
  const rows = await sql`UPDATE cliente SET nome=${nome}, cpf=${cpf} WHERE id=${id};`;
  return rows.rows;
}

export async function DELETE(id:number) {
  const result = await sql`DELETE FROM cliente WHERE id = ${id}`;
  return result.rows;
}