import { sql } from "@vercel/postgres";
import "./style.css"
import Cadastrar_Veiculo from "@/components/Cadastrar_Veiculo/Cadastrar_Veiculo";

export default async function Home(){

    const { rows } = await sql`SELECT v.placa, v.modelo, v.cor, c.nome from veiculo as v inner join cliente as c on v.cliente_id = c.id`;
    
   

    return(
        <main>
            <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 py-1 my-4 rounded w-full">Cadastrar</button>

            <div id="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Modelo</th>
                                <th>Cor</th>
                                <th>Dono</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.placa}</td>
                                <td>{row.modelo}</td>
                                <td>{row.cor}</td>
                                <td>{row.nome}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                        
                <Cadastrar_Veiculo></Cadastrar_Veiculo>
        </main>   
    
)
    
}