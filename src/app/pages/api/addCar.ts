// pages/api/addCar.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg"; // Caso use o Vercel Postgres, pode ajustar conforme o banco.

// Configurações do banco com variáveis de ambiente
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { model, plate, color } = req.body;

    try {
      await client.connect();
      const result = await client.query(
        "INSERT INTO cars (model, plate, color) VALUES ($1, $2, $3) RETURNING *",
        [model, plate, color]
      );
      await client.end();

      res.status(200).json({ success: true, car: result.rows[0] });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Falha ao inserir carro." });
    }
  } else {
    res.status(405).json({ success: false, error: "Método não permitido" });
  }
}
