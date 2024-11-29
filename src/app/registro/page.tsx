"use client";

import { useEffect, useState } from "react";
import { GET, POST } from "../api/usuarios/route";
import "./style.css";

interface Usuario {
  id: number;
  username: string;
  password: string;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [user_input, setUser] = useState("");
  const [pass_input, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [password_length, setLength] = useState(false);
  const [password_special, setSpecial] = useState(false);
  const [password_weak, setWeakPassword] = useState(false);
  const [weakPasswords, setWeakPasswords] = useState<string[]>([]);
  const [logado, setLogado] = useState(Boolean);

  useEffect(() => {
    const fetchWeakPasswords = async () => {
      try {
        const response = await fetch("/10-million-password-list-top-100000.txt");
        const text = await response.text();
        const passwords = text
          .split('\n')
          .map(line => line.trim())   
          .filter(line => line);     

        setWeakPasswords(passwords);
      } catch (error) {
        console.error("Erro ao buscar senhas fracas:", error);
      }
    };

    fetchWeakPasswords();

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

  useEffect(() => {
    setLength(pass_input.length >= 8);
    setSpecial(/[^A-Za-z0-9]/.test(pass_input));
    setWeakPassword(weakPasswords.includes(pass_input));  
  }, [pass_input, weakPasswords]);

  const handleSubmit = async () => {
    if (password_weak) {
      setMessage("A senha inserida é muito fraca. Por favor, escolha outra.");
      return;
    }

    const userExists = usuarios.some(
      (user) => user.username === user_input
    );

    if (userExists){
      alert("Usuário já cadastrado!");
      return;
    }
    if (!userExists && !password_weak){
      const response = await POST(user_input, pass_input);
      console.log(response);
      location.href = "/login";
    }
  };

  function checkLog(){
    if (!logado){
      const headerButtons = document.getElementById('header_buttons');
      if(headerButtons){
        headerButtons.style.display = "none"
      }
    }
  }

  return (
    <main>
      <input
        type="text"
        name="user"
        id="user"
        placeholder="Usuário"
        value={user_input}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        value={pass_input}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" id="submit">
        Cadastrar
      </button>
      {message && <p id="return">{message}</p>}
      <p id="password-requirements">
        {password_length ? "Senha tem o comprimento adequado." : "A senha precisa ter no mínimo 8 caracteres."}
        <br />
        {password_special ? "Senha contém caracteres especiais." : "A senha precisa ter caracteres especiais."}
        <br />
        {password_weak && "A senha é muito fraca. Escolha outra."}
      </p>
    </main>
  );
}
