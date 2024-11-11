"use client";

import { useState } from "react";
import { POST } from "../../app/api/clientes/route";
import "./style.css";


export default function Cadastrar_Window() {
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState(Number);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (CPF.toString().length == 11 && nome){
      const response = await POST(nome, CPF);
      console.log(response);
      location.href = "/clientes";
    }else
    {
      alert("Campos inválidos")
    }
  };

  function defineVisible() {
    const window = document.getElementById("cadastrar_cliente");
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

      <div id="cadastrar_cliente" className="rounded py-7">
        <div id="window_title">
          <h1>Cadastrar cliente</h1>
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
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="number"
            name="cpf"
            id="cpf"
            placeholder="CPF"
            value={CPF}
            onChange={(e) => setCPF(Number(e.target.value))}
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
