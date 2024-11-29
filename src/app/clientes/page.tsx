"use client";

import "./style.css";
import { GET, DELETE, UPDATE } from "../api/clientes/route";
import { useEffect, useState } from "react";
import Cadastrar_Cliente from "@/components/Cadastrar_Cliente/Cadastrar_Cliente";

interface Cliente {
  id: number;
  nome: string;
  cpf: number;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

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

  const handleEditClick = (cliente: Cliente) => {
    setEditingCliente(cliente);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCliente) {
      const { name, value } = e.target;
      setEditingCliente({ ...editingCliente, [name]: value });
    }
  };

  const saveEdit = async () => {
    if (editingCliente) {
      try {
        await UPDATE(editingCliente.id, editingCliente.nome, editingCliente.cpf);
        setEditingCliente(null);
        await getClientes();
      } catch (error) {
        console.error("Error updating cliente:", error);
      }
    }
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
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => handleEditClick(row)}
                  >
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

      {editingCliente && (
        <div className="edit-form">
          <h3>Editar Cliente</h3>
          <div className="edit-area">
          <h3>
            Nome:
            </h3>
            <input
              type="text"
              name="nome"
              value={editingCliente.nome}
              onChange={handleEditChange}
              />
          </div>
          <div className="edit-area">
          <h3>
            CPF:
            </h3>
            <input
              type="number"
              name="cpf"
              value={editingCliente.cpf}
              onChange={handleEditChange}
              />
              </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded" onClick={saveEdit}>
            Salvar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 mx-1 my-1 rounded"
            onClick={() => setEditingCliente(null)}
          >
            Cancelar
          </button>
        </div>
      )}

      <Cadastrar_Cliente></Cadastrar_Cliente>
    </main>
  );
}
