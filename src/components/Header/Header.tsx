"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div id="in_line_header">
                <div>
                    <h1 className="font-bold"><Link href='/#'>Garage</Link></h1>
                </div>
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
                        Relatórios
                    </a>
                    <a href="/graficos" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Gráficos
                    </a>
                    <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
                        Login
                    </a>
                </div>
            </div>
        </header>
    );
}
