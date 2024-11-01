import { sql } from "@vercel/postgres";
import "./style.css"

export default async function Home(){

    const { rows } = await sql`SELECT veiculo.*, veiculo.placa from movimento inner join veiculo on movimento.carro_id = veiculo.id`;
    
    return(
        <main>
            <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 py-2 my-4 rounded w-full">Estacionar</button>
            <div id="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Entrada</th>
                                <th>Carro</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.entrada}</td>
                                <td>{row.carro}</td>
                                <td>
                                    <button >Editar</button>
                                    <button >Excluir</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            
        </main>   
    
)
    
}