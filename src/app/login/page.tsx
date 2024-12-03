"use client";

import { useEffect, useState } from "react";
import { GET } from "../api/usuarios/route";
import "./style.css"

interface Usuario {
  id: number;
  username: string;
  password: string;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");
  const [logado, setLogado] = useState(Boolean);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GET();
        const usuarios = result.rows.map((row) => ({
          id: row.id,
          username: row.username,
          password: row.password,
        }));
        setUsuarios(usuarios);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setLogado(false);
    checkLog();
    fetchData();
  }, []);

  function checkLog(){
    if (!logado){
      const headerButtons = document.getElementById('header_buttons');
      if(headerButtons){
        headerButtons.style.display = "none"
      }
    }


  }

  const handleSubmit = () => {
    const userExists = usuarios.some(
      (user) => user.username === inputUsername && user.password === inputPassword
    );

    if (userExists) {
      setMessage("Logado com sucesso!");
      setLogado(true);
      window.location.href = "/estacionamento"
    } else {
      setMessage("Nome de usuário ou senha inválidos.");
    }
  };

  return (
    <main>

      <input
        type="text"
        name="user"
        id="user"
        placeholder="Usuário"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      id="submit">
        Submit
      </button>
      <a href="/registro">Não tem cadastro? Cadastre-se</a>
      {message && <p id="return">{message}</p>}
 </main>
  );
}
