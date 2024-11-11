"use client";

import { useEffect, useState } from "react";
import "./style.css";
import * as movimento from "../api/movimento/route";
import * as veiculo from "../api/veiculos/route";
import Estacionar_Veiculo from "@/components/Estacionar_Veiculo/Estacionar_Veiculo";

interface Movimento {
  id: number;
  ativo?: boolean;
  data: string;
  hora_entrada: string;
  hora_saida: string;
  preco: number;
  carro_id: number;
  placa: string;
  modelo: string;
}

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
}

export default function Home() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await movimento.GET();
      const lista_movimentos = result.rows
        .filter((row) => row.ativo)
        .map((row) => ({
          id: row.id,
          ativo: row.ativo,
          data: row.data,
          hora_entrada: row.hora_entrada,
          hora_saida: row.hora_saida,
          preco: row.preco,
          carro_id: row.carro_id,
          placa: row.placa,
          modelo: row.modelo,
        }));

      const v_result = await veiculo.GET();
      const lista_veiculos = v_result.map((row) => ({
        id: row.id,
        placa: row.placa,
        modelo: row.modelo,
      }));

      setMovimentos(lista_movimentos);
      setVeiculos(lista_veiculos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteMovement = async (id: number) => {
    try {
      const result = await movimento.DELETE(id);
      console.log(result);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>

      <div id="tabela">
        <table>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Carro</th>
              <th>Modelo</th>
              <th>Ações</th>
              <th>Finalizar</th>
            </tr>
          </thead>
          <tbody>
            {movimentos.map((row, index) => (
              <tr key={index}>
                <td>{row.hora_entrada}</td>
                <td>{row.placa}</td>
                <td>{row.modelo}</td>
                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded">
                    Editar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => deleteMovement(row.id)}
                  >
                    Excluir
                  </button>
                </td>
                <td><button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded">
                    $
                  </button></td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Estacionar_Veiculo Veiculos={veiculos}></Estacionar_Veiculo>
    </main>
  );
}
