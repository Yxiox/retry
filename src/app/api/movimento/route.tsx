"use server";

import { sql } from "@vercel/postgres";

export async function POST(
ativo:boolean,
hora_entrada:string,
data_entrada:string,
preco:number,
carro_id:number
) {
  try {
    const rows = await sql`INSERT INTO movimento (ativo, hora_entrada, preco, carro_id, data_entrada) VALUES (${ativo}, ${hora_entrada}, ${preco}, ${carro_id}, ${data_entrada});`;
    return rows.rows;
} catch (error) {
  return error;
}
}

export async function GET() {
  const result = await sql`SELECT movimento.*, veiculo.placa as placa, veiculo.modelo as modelo FROM movimento INNER JOIN veiculo ON movimento.carro_id = veiculo.id`;
  return  {rows: result.rows.map((row)=>({
    id:row.id,
    ativo:row.ativo,
    hora_entrada:row.hora_entrada,
    hora_saida:row.hora_saida,
    data_entrada:row.data_entrada,
    preco:row.preco,
    precofim: row.precofim,
    carro_id:row.carro_id,
    placa:row.placa,
    modelo:row.modelo,
  }))}
}

export async function GETBYID(id: number,) {
  const result = await sql`
    SELECT 
      *
    FROM movimento 
    WHERE id = ${id}`;
  return {
    rows: result.rows.map((row) => ({
      diff_in_days: row.diff_in_days,
      diff_in_hours: row.diff_in_hours,
    })),
  };
}

export async function DELETE(id:number) {
  const result = await sql`DELETE FROM movimento WHERE id = ${id}`;
  return result.rows;
}

export async function UPDATEEND(hora_saida:string, id:number, preco:number ) {
  try{
    // Exemplo de update que funcionou no banco:
    // UPDATE movimento SET ativo=false, data=daterange('2024-11-4', '2024-11-11'), hora_saida='21:10:00' WHERE id = 3;
    const result = await sql`UPDATE movimento SET ativo=false, hora_saida=${hora_saida}, precoFim=${preco} WHERE id = ${id};`
    return result.rows;
  }
  catch (error){
    return error;
  }
}

export async function UPDATE(hora_entrada:string, id:number, preco:number ) {
  const result = await sql`UPDATE movimento SET hora_entrada=${hora_entrada}, preco=${preco} WHERE id = ${id};`
    return result.rows;
}



export async function GETFILTERED(sqlString:string) {
  const result = await sql`${sqlString}`;
  return result.rows;
}