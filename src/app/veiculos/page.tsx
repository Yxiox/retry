"use client";

import "./style.css";
import * as veiculos from "../../app/api/veiculos/route";
import * as clientes from "../../app/api/clientes/route";
import Cadastrar_Window from "@/components/Cadastrar_Veiculo/Cadastrar_Veiculo";
import { useEffect, useState } from "react";

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  cliente_id: number;
  nome: string;
}

interface Cliente {
  id: number;
  nome: string;
  CPF: number;
}

export default function Home() {
  const [lista_veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [lista_clientes, setClientes] = useState<Cliente[]>([]);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);

  useEffect(() => {
    getVeiculos();
    getClientes();
  }, []);

  const getVeiculos = async () => {
    const newVeiculos = await veiculos.GET();

    const lista_veiculos_raw = newVeiculos.map((row) => ({
      id: row.id,
      placa: row.placa,
      modelo: row.modelo,
      cor: row.cor,
      cliente_id: row.cliente_id,
      nome: row.nome,
    }));

    setVeiculos(lista_veiculos_raw);
  };

  const getClientes = async () => {
    const newClientes = await clientes.GET();

    const lista_clientes_raw = newClientes.map((row) => ({
      id: row.id,
      nome: row.nome,
      CPF: row.CPF,
    }));
    setClientes(lista_clientes_raw);
  };

  const deleteCar = async (id: number) => {
    try {
      const newVeiculos = await veiculos.DELETE(id);
      await getVeiculos();
      console.log(newVeiculos);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (veiculo: Veiculo) => {
    setEditingVeiculo(veiculo);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editingVeiculo) {
      const { name, value } = e.target;
      setEditingVeiculo({ ...editingVeiculo, [name]: value });
    }
  };

  const saveEdit = async () => {
    if (editingVeiculo) {
      try {
        await veiculos.UPDATE(editingVeiculo.id, editingVeiculo.placa, editingVeiculo.modelo, editingVeiculo.cor, editingVeiculo.cliente_id);
        setEditingVeiculo(null);
        await getVeiculos();
      } catch (error) {
        console.error("Error updating veiculo:", error);
      }
    }
  };

  return (
    <main>
      <div id="tabela" className="py-10">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Dono</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista_veiculos.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.placa}</td>
                <td>{row.modelo}</td>
                <td>{row.cor}</td>
                <td>{row.nome}</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => handleEditClick(row)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => deleteCar(row.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingVeiculo && (
        <div className="edit-form">
          <h3>Editar Veículo</h3>
          <div className="edit-area">
            <h3>
            Placa:
            </h3>
            <input
              type="text"
              name="placa"
              value={editingVeiculo.placa}
              onChange={handleEditChange}
              />
              </div>
          <div className="edit-area">
          <h3>
            Modelo:
            </h3>
            <input
              type="text"
              name="modelo"
              value={editingVeiculo.modelo}
              onChange={handleEditChange}
            /></div>
          <div className="edit-area">
          <h3>
            Cor:
            </h3>
            <input
              type="text"
              name="cor"
              value={editingVeiculo.cor}
              onChange={handleEditChange}
              /></div>
          <div className="edit-area">
          <h3>
            Dono:
            </h3>
            <select
              name="cliente_id"
              value={editingVeiculo.cliente_id}
              onChange={handleEditChange}
            >
              {lista_clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 mx-1 my-1 rounded"
            onClick={saveEdit}
          >
            Salvar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 mx-1 my-1 rounded"
            onClick={() => setEditingVeiculo(null)}
            >
            Cancelar
          </button>
        </div>
      )}

      <Cadastrar_Window clientes={lista_clientes} />
    </main>
  );
}
