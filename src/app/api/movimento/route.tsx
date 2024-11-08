"use server";

import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/ApiHandler";
import { sql } from "@vercel/postgres";

export async function POST(
id:number,
ativo:boolean,
data:string,
hora_entrada:string,
hora_saida:string,
preco:number,
carro_id:number
): Promise<NextResponse> {
  try {
    const rows = sql`INSERT INTO veiculo (id,ativo,data,hora_entrada,hora_saida,preco,carro_id) VALUES (${id}, ${ativo}, ${data}, ${hora_entrada}, ${hora_saida}, ${preco}. ${carro_id})`;
    return ApiHandler.ResponseToJson(rows, 201);
} catch (error) {
  return ApiHandler.ResponseToJson(error, 500);
}
}


export async function GET() {
  return sql`SELECT movimento.*, veiculo.placa, veiculo.modelo FROM movimento INNER JOIN veiculo ON movimento.carro_id = veiculo.id`;
}