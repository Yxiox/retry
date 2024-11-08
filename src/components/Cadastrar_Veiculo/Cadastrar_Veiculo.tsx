"use client";

import { useState } from "react";
import { POST } from "../../app/api/veiculos/route";
import "./style.css";

interface Cliente {
  id: number;
  nome: string;
  CPF: number;
}

interface CadastrarWindowProps {
  clientes: Cliente[];
}

export default function Cadastrar_Window({ clientes }: CadastrarWindowProps) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [cliente_id, setCliente] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await POST(placa, modelo, cor, Number(cliente_id));
    const result = await response.json();
    console.log(result);

    window.location.reload();
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
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 my-4 rounded w-4/5"
        id="cadastrar"
        onClick={defineVisible}
      >
        Cadastrar
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
        <div>
          <input
            type="text"
            name="placa"
            id="placa"
            placeholder="Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <input
            type="text"
            name="modelo"
            id="modelo"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="cor"
            id="cor"
            placeholder="Cor"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          />

          <select
            className="border p-2"
            value={cliente_id}
            onChange={(e) => setCliente(e.target.value)}
          >
            <option value="">Select Client</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
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
