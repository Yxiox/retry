import "./style.css"
import { GET } from "../api/clientes/route";

export default async function Home(){

    const { rows } = await GET();
    
    return(
        <main>
            <div id="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.nome}</td>
                                <td>{row.CPF}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            
        </main>   
    
)
    
}