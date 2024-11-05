"use client";

import { useState } from "react";
// import { POST } from "../../app/api/veiculos/route";
import "./style.css";

export default function Cadastrar_Window() {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [cliente_id, setCliente] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const temp = Number(cliente_id);
    const response = await fetch("http://localhost:3000/api/veiculos",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        placa, modelo, cor, temp
      })
    }) .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      console.log('Resposta do servidor:', data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
    // const response = await POST(placa, modelo, cor, Number(cliente_id));
    // const result = await response.json();
    console.log(response);
  };

  function defineVisible(){
    const window = document.getElementById("cadastrar_veiculo");
    if (window) {
      window.style.display = window.style.display === "flex" ? "none" : "flex";
    }
  }

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 py-1 my-4 rounded w-4/5" id="cadastrar" onClick={defineVisible}>Cadastrar</button>

      <div id="cadastrar_veiculo" className="rounded py-7">
        <div id="window_title" className="">
          <h1>Cadastrar veículo</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded" id="close_window" onClick={defineVisible}>
            X
          </button>
        </div>
        <div>
          <input
            type="text"
            name="placa"
            id="placa"
            placeholder="Placa"
            onChange={(e) => setPlaca(e.target.value)}
          />
          <input
            type="text"
            name="modelo"
            id="modelo"
            placeholder="Modelo"
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="cor"
            id="cor"
            placeholder="Cor"
            onChange={(e) => setCor(e.target.value)}
          />

          {/* Provisório */}
          <input
            type="number"
            name="cliente"
            id="cliente"
            placeholder="ID Cliente"
            onChange={(e) => setCliente(e.target.value)}
          />

          {/* <select className="border p-2">
                 {rows.map((row) => ( <option key={row.id} value={row.id}> {row.nome} </option> ))}
                 </select> */}
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white  px-4 py-1 my-4 rounded w-1/2"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
