"use client";

import "./style.css";
import { GET, DELETE } from "../api/clientes/route";
import { useEffect, useState } from "react";
import Cadastrar_Cliente from "@/components/Cadastrar_Cliente/Cadastrar_Cliente";

interface Cliente {
  id: number;
  nome: string;
  cpf: number;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    const response = await GET();

    const result = response.map((row) => ({
      id: row.id,
      nome: row.nome,
      cpf: row.cpf,
    }));

    setClientes(result);
  };

  const deletePerson = async (id: number) => {
    const response = await DELETE(id);
    console.log(response);
    await getClientes();
  };
  return (
    <main>
      <div id="tabela">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((row, index) => (
              <tr key={index}>
                <td>{row.nome}</td>
                <td>{row.cpf}</td>
                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded">
                    Editar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => deletePerson(row.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Cadastrar_Cliente></Cadastrar_Cliente>
    </main>
  );
}
