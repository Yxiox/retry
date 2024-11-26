"use client";

import { useState } from "react";
import { POST } from "../../app/api/movimento/route";
import "./style.css";

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
}

interface EstacionarWindowProps {
  Veiculos: Veiculo[];
}

export default function Estacionar_Veiculo({Veiculos}:EstacionarWindowProps) {
  const [hora, setHora] = useState("");
  const [preco, setPreco] = useState(Number);
  const [carro_id, setCarro] = useState(Number);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await POST(true, hora, preco, carro_id);
    console.log(response);
    location.href = "/estacionamento"
  };

  function defineVisible() {
    const window = document.getElementById("cadastrar_veiculo");
    if (window) {
      window.style.display = window.style.display === "flex" ? "none" : "flex";
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white text-5xl px-2 rounded-full w-1/10"
        id="cadastrar"
        onClick={defineVisible}
      >
        +
      </button>

      <div id="cadastrar_veiculo" className="rounded py-7">
        <div id="window_title">
          <h1>Cadastrar veículo</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
            id="close_window"
            onClick={defineVisible}
          >
            X
          </button>
        </div>
        <div className="w-full">
          
          <input
            type="time"
            name="hora"
            id="hora"
            placeholder="Hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center mt-4 relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 translate-x-7 text-gray-500">R$</span>
        <input
            type="number"
            name="preco"
            id="preco"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
          />

          <select
            className="border p-2"
            value={carro_id}
            onChange={(e) => setCarro(Number(e.target.value))}
          >
            <option value="">Selecione o Carro</option>
            {Veiculos.map((veiculo) => (
              <option key={veiculo.id} value={veiculo.id}>
                {veiculo.placa + " | " + veiculo.modelo}
              </option>
            ))}
          </select>
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
