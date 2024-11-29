"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header id='Header'>
            <div>
                <h1 className="font-bold"><Link href='/#'>Garage</Link></h1>
            </div>
            <div id="in_line_header">
                <div>
                    <button
                        id="hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        ☰
                    </button>
                </div>
                <div id="header_buttons" className={isOpen ? 'open' : ''}>
                    <a href="/estacionamento" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Estacionamento
                    </a>
                    <a href="/veiculos" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Veículos
                    </a>
                    <a href="/clientes" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Clientes
                    </a>
                    <a href="/relatorios" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Relatório
                    </a>
                    <a href="/graficos" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Gráfico
                    </a>
                </div>
            </div>
            <div className="relative group">
                <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                    Login
                </a>
                <span className="absolute left-[-230px] top-[50%] -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Se estiver logado, clique para sair
                </span>
            </div>
        </header>
    );
}
