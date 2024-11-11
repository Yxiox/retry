"use server";

import { sql } from "@vercel/postgres";

export async function POST(
ativo:boolean,
data:string,
hora_entrada:string,
preco:number,
carro_id:number
) {
  try {
    const rows = await sql`INSERT INTO movimento (ativo, data, hora_entrada, preco, carro_id) VALUES (${ativo}, daterange(${data},'infinity'), ${hora_entrada}, ${preco}, ${carro_id});`;
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
    data:row.data,
    hora_entrada:row.hora_entrada,
    hora_saida:row.hora_saida,
    preco:row.preco,
    carro_id:row.carro_id,
    placa:row.placa,
    modelo:row.modelo,
  }))}
}

export async function DELETE(id:number) {
  const result = await sql`DELETE FROM movimento WHERE id = ${id}`;
  return result.rows;
}

export async function UPDATE(data:string, endData:string, hora_saida:string, id:number ) {
  try{
    const result = await sql`UPDATE movimento SET ativo=false, data=daterange(${data}, ${endData}), hora_saida=${hora_saida} WHERE id = ${id};`
    return result.rows;

  }
  catch (error){
    return error;
  }
}