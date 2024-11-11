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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded">
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

      <Cadastrar_Window clientes={lista_clientes} />
    </main>
  );
}
