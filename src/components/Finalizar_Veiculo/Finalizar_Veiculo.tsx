"use client";

import { useState } from "react";
import { UPDATE } from "../../app/api/movimento/route";
import "./style.css";

interface Movimento {
  id: number;
  ativo?: boolean;
  data_entrada: string;
  data_saida: string;
  hora_entrada: string;
  hora_saida: string;
  preco: number;
  carro_id: number;
  placa: string;
  modelo: string;
}

interface FinalizarWindowProps {
  movimento: Movimento;
  onClose: () => void;
}

export default function Finalizar_Veiculo({ movimento, onClose }: FinalizarWindowProps) {
  const [end_data, setData] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const calcularValor = () => {
    const data1 = new Date(movimento.data_entrada);
    const data2 = new Date(end_data);

    const diferencaEmMilissegundos = data2.getTime() - data1.getTime();
    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

    let valorCalculado = diferencaEmDias * (movimento.preco * 10);

    const [hora1, minuto1] = movimento.hora_entrada.split(':').map(Number); 
    const [hora2, minuto2] = hora.split(':').map(Number); 
    data1.setHours(hora1, minuto1, 0); 
    data2.setHours(hora2, minuto2, 0);  
    const diferencaEmMilissegundo = data2.getTime() - data1.getTime(); 
    const diferencaEmHoras = diferencaEmMilissegundo / (1000 * 60 * 60);

    valorCalculado += diferencaEmHoras * movimento.preco;

    setValor(valorCalculado);
  }
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await UPDATE(movimento.data_entrada, end_data, hora, movimento.id);
    console.log(response);
    location.href = "/estacionamento";
    onClose();
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
            onBlur={calcularValor} 
          />
          <input
            type="time"
            name="hora"
            id="hora"
            placeholder="Hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            onBlur={calcularValor} 
            />
        </div>

        <h1 className="my-3">
          Valor a cobrar: R${valor.toFixed(2)}
        </h1>

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded w-1/2"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
