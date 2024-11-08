"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { GET } from "../api/movimento/route";

interface Veiculo {
    id:number,
    ativo?:boolean,
    data:string,
    hora_entrada:string,
    hora_saida:string,
    preco:number,
    carro_id:number,
    placa:string,
    modelo:string
}

export default function Home() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GET();
        const lista_veiculos = result.rows.map((row) => ({
            id:row.id,
            ativo:row.ativo,
            data:row.data,
            hora_entrada:row.hora_entrada,
            hora_saida:row.hora_saida,
            preco:row.preco,
            carro_id:row.carro_id,
            placa:row.placa,
            modelo:row.modelo
        }));

        setVeiculos(lista_veiculos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 rounded w-full">
        Estacionar
      </button>
      <div id="tabela">
        <table>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Carro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((row, index) => (
              <tr key={index}>
                <td>{row.hora_entrada}</td>
                <td>{row.placa}</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
