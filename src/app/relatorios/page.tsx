"use client";

import { useEffect, useState } from "react";
import { GET } from "../api/movimento/route";
import "./style.css";

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

export default function Home() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await GET();
      const lista_movimentos = result.rows
        .filter((row) => !row.ativo)
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

      setMovimentos(lista_movimentos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calcularTotal = () => {
    return movimentos.reduce((total, movimento) => {
      const preco = parseFloat(movimento.precofim.replace("$", "")) || 0;
      return total + preco;
    }, 0).toFixed(2); 
  };

  return (
    <main>
      <div id="main_div">
        <div id="tabela">
          <table>
            <thead>
              <tr>
                <th>Carro</th>
                <th>Hora Entrada</th>
                <th>Hora Saída</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {movimentos.map((row, index) => (
                <tr key={index}>
                  <td>
                    {row.placa} | {row.modelo}
                  </td>
                  <td>{row.hora_entrada}</td>
                  <td>{row.hora_saida}</td>
                  <td>{row.precofim}</td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={3}
                  style={{ fontWeight: "bold", textAlign: "right" }}
                >
                  Total
                </td>
                <td style={{ fontWeight: "bold" }}>{calcularTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
