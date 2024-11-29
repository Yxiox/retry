"use client";

import { useEffect, useState } from "react";
import "./style.css";
import * as movimento from "../api/movimento/route";
import * as veiculo from "../api/veiculos/route";
import Estacionar_Veiculo from "@/components/Estacionar_Veiculo/Estacionar_Veiculo";
import Finalizar_Veiculo from "@/components/Finalizar_Veiculo/Finalizar_Veiculo";

interface Movimento {
  id: number;
  ativo?: boolean;
  hora_entrada: string;
  hora_saida: string;
  preco: string;
  precofim: string;
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
  const [showFinalizar, setShowFinalizar] = useState(false);
  const [selectedMovimento, setSelectedMovimento] = useState<Movimento | null>(null);
  const [editingMovimento, setEditingMovimento] = useState<Movimento | null>(null);

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
          hora_entrada: row.hora_entrada,
          hora_saida: row.hora_saida,
          preco: row.preco,
          precofim: row.precofim,
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

  const handleFinalizarClick = (movimento: Movimento) => {
    setSelectedMovimento(movimento);
    setShowFinalizar(true);
  };

  const handleEditClick = (movimento: Movimento) => {
    setEditingMovimento(movimento);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingMovimento) {
      const { name, value } = e.target;
      setEditingMovimento({ ...editingMovimento, [name]: value });
    }
  };

  const saveEdit = async () => {
    if (editingMovimento) {
      try {
        await movimento.UPDATE(editingMovimento.hora_entrada,editingMovimento.id,Number(editingMovimento.preco));
        setEditingMovimento(null);
        await fetchData();
      } catch (error) {
        console.error("Error updating movimento:", error);
      }
    }
  };

  return (
    <main>
      <div id="tabela">
        <table>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Preço/Hr</th>
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
                <td>{row.preco}</td>
                <td>{row.placa}</td>
                <td>{row.modelo}</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => deleteMovement(row.id)}
                  >
                    Excluir
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => handleEditClick(row)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded"
                    onClick={() => handleFinalizarClick(row)}
                  >
                    $
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMovimento && (
        <div className="edit-form">
          <h3>Editar Movimento</h3>
          <div className="edit-area">
          <h3>
            Hora Entrada: 

          </h3>
            <input
              type="time"
              name="hora_entrada"
              id="hora_edit"
              value={editingMovimento.hora_entrada}
              onChange={handleEditChange}
            />
          </div>
          <div className="edit-area">
          <h3>Preço/Hora:</h3>
          <input
              type="number"
              name="preco"
              value={editingMovimento.preco}
              onChange={handleEditChange}
              />
              </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-1 my-1 rounded" onClick={saveEdit}>
            Salvar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 mx-1 my-1 rounded"
            onClick={() => setEditingMovimento(null)}
          >
            Cancelar
          </button>
        </div>
      )}

      <Estacionar_Veiculo Veiculos={veiculos}></Estacionar_Veiculo>

      {showFinalizar && selectedMovimento && (
        <Finalizar_Veiculo
          movimento={selectedMovimento}
          onClose={() => setShowFinalizar(false)}
        />
      )}
    </main>
  );
}
