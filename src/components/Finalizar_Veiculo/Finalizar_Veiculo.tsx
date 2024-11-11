"use client";

import { useState } from "react";
import { UPDATE } from "../../app/api/movimento/route";
import "./style.css";

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

interface FinalizarWindowProps {
  movimento: Movimento;
  onClose: () => void
}

export default function Finalizar_Veiculo({movimento, onClose}:FinalizarWindowProps) {
  const [end_data, setData] = useState(Date);
  const [hora, setHora] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const response = await UPDATE(movimento.data, end_data, hora, movimento.id);
    console.log(response);
    location.href = "/estacionamento"
  };


  return (
    <div>
      <div id="Finalizar_veiculo" className="rounded py-7">
        <div id="window_title">
          <h1>Finalizar veículo</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
            id="close_window"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="w-full">
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Data"
            value={end_data}
            onChange={(e) => setData(e.target.value)}
          />
          <input
            type="time"
            name="hora"
            id="hora"
            placeholder="Hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
       
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 my-4 rounded w-1/2"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
