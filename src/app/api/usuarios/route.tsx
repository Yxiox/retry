"use server";

import { sql } from "@vercel/postgres";

export async function POST(
  usuario:string,
  senha:string,
) {
  try {
    const rows = await sql`INSERT INTO user (username, password) VALUES (${usuario}, ${senha})`;
    return rows.rows;
} catch (error) {
  return error;
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