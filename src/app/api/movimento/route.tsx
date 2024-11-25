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
  const result = await sql`SELECT movimento.*,  TO_CHAR(lower(movimento.data), 'YYYY-MM-DD') as data_entrada, TO_CHAR(upper(movimento.data), 'YYYY-MM-DD') as data_saida, , veiculo.placa as placa, veiculo.modelo as modelo FROM movimento INNER JOIN veiculo ON movimento.carro_id = veiculo.id`;
  return  {rows: result.rows.map((row)=>({
    id:row.id,
    ativo:row.ativo,
    data_entrada:row.data_entrada,
    data_saida:row.data_saida,
    hora_entrada:row.hora_entrada,
    hora_saida:row.hora_saida,
    preco:row.preco,
    carro_id:row.carro_id,
    placa:row.placa,
    modelo:row.modelo,
  }))}
}

export async function GETBYID(id: number, end_date: string) {
  const result = await sql`
    SELECT 
      EXTRACT(DAY FROM ${end_date} - lower(movimento.data)) AS diff_in_days,
      EXTRACT(HOUR FROM upper(movimento.data) - lower(movimento.data)) AS diff_in_hours
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

export async function UPDATE(data:string, endData:string, hora_saida:string, id:number ) {
  try{
    // Exemplo de update que funcionou no banco:
    // UPDATE movimento SET ativo=false, data=daterange('2024-11-4', '2024-11-11'), hora_saida='21:10:00' WHERE id = 3;
    const result = await sql`UPDATE movimento SET ativo=false, data=daterange(upper(movimento.data), ${endData}), hora_saida=${hora_saida} WHERE id = ${id};`
    return result.rows;
  }
  catch (error){
    return error;
  }
}