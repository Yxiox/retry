// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../lib/db";

type Cliente = {
  id: number;
  name: string;
  CPF: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query("SELECT * FROM cliente");
    const users: Cliente[] = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clientes" });
  }
}
