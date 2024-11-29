/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PieChart from "@/components/PieChart/PieChart";
import { useEffect, useState } from "react";
import { GET } from "../api/movimento/route";

import "./style.css"

interface Movimento {
    id: number;
    ativo?: boolean;
    data_entrada: string;
    hora_entrada: string;
    hora_saida: string;
    preco: number;
    carro_id: number;
    placa: string;
    modelo: string;
  }

export default function Home(){
    const [movimentos_ativos, setMovimentoAtivo] = useState<Movimento[]>([]);
    const [movimentos_inativos, setMovimentoInativo] = useState<Movimento[]>([]);
    const [qtd_ativo, setQtdAtivo] = useState(Number);
    const [qtd_inativo, setQtdInativo] = useState(Number);
    
    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try
        {
            const result = await GET()

            const lista_movimentos_ativos = result.rows
            .filter((row) => row.ativo)
            .map((row) => ({
                id: row.id,
                ativo: row.ativo,
                data_entrada: row.data_entrada,
                hora_entrada: row.hora_entrada,
                hora_saida: row.hora_saida,
                preco: row.preco,
                carro_id: row.carro_id,
                placa: row.placa,
                modelo: row.modelo,
            }));

            const lista_movimentos_inativos = result.rows
            .filter((row) => !row.ativo)
            .map((row) => ({
                id: row.id,
                ativo: row.ativo,
                data_entrada: row.data_entrada,
                hora_entrada: row.hora_entrada,
                hora_saida: row.hora_saida,
                preco: row.preco,
                carro_id: row.carro_id,
                placa: row.placa,
                modelo: row.modelo,
            }));
            
            let temp = 0;

            lista_movimentos_ativos.forEach(movimento => {
                temp++;
            });

            setQtdAtivo(temp);

            temp = 0;

            lista_movimentos_inativos.forEach(movimento => {
                temp++;
            });

            setQtdInativo(temp);

            setMovimentoAtivo(lista_movimentos_ativos);
            setMovimentoInativo(lista_movimentos_inativos);
        }
        catch (error)
        {
            console.log(error)
        }
    }

    return(
        <main>
            <h1>Veículos ativos e finalizados</h1>
            <PieChart labels={["Ativos", "Finalizados"]} dataValues={[qtd_ativo, qtd_inativo]}></PieChart>
        </main>
    )
}