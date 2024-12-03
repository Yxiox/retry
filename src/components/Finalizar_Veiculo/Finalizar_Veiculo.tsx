"use client";

import { useState } from "react";
import { UPDATEEND } from "../../app/api/movimento/route";
import "./style.css";

interface Movimento {
  id: number;
  ativo?: boolean;
  hora_entrada: string;
  hora_saida: string;
  preco: string;
  precofim:string,
  carro_id: number;
  placa: string;
  modelo: string;
}

interface FinalizarWindowProps {
  movimento: Movimento;
  onClose: () => void;
}

export default function Finalizar_Veiculo({ movimento, onClose }: FinalizarWindowProps) {
  const [hora, setHora] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const calcularValor = async ()  => {
    if (!hora || !movimento.preco) return;

    const precoLimpo = parseFloat(movimento.preco.replace(/[^\d,.-]/g, '').replace(',', '.'));
    if (isNaN(precoLimpo)) {
      console.error("Erro ao processar o preço.");
      setValor(0);
      return;
    }
  
    const [horaEntrada, minutoEntrada] = movimento.hora_entrada.split(":").map(Number);
    const [horaSaida, minutoSaida] = hora.split(":").map(Number);
  
    const entradaEmMinutos = horaEntrada * 60 + minutoEntrada;
    const saidaEmMinutos = horaSaida * 60 + minutoSaida;
  
    const diferencaEmMinutos = saidaEmMinutos - entradaEmMinutos;
  
    if (diferencaEmMinutos < 0) {
      alert("Hora de saída deve ser maior que a hora de entrada!");
      setValor(0);
      return;
    }
  
    const diferencaEmHoras = diferencaEmMinutos / 60;
    const valorCalculado = diferencaEmHoras * precoLimpo;
  
    if(diferencaEmHoras > 0){
      console.log(`Valor calculado: R$${valorCalculado.toFixed(2)}`);
      setValor(valorCalculado);

    }else{
      alert("Hora inválida");
    }
  }
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(valor > 0){
      const response = await UPDATEEND(hora, movimento.id, valor);
      console.log(response);
      location.href = "/estacionamento";
      onClose();
    }
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
            type="time"
            name="hora"
            id="hora"
            min="07:00"
            max="19:00"
            required
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
