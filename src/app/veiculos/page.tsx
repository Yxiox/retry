import "./style.css";
import * as veiculos from "../../app/api/veiculos/route";
import * as clientes from "../../app/api/clientes/route";
import Cadastrar_Window from "@/components/Cadastrar_Veiculo/Cadastrar_Veiculo";

export default async function Home() {
    
    const { rows } = await veiculos.GET();
    const newLocal = await clientes.GET();

    const lista_clientes = newLocal.rows.map((row) => ({
        id: row.id,
        nome: row.nome,
        CPF: row.CPF,
    }));


    console.log(newLocal);

    return (
        <main>
            <div id="tabela" className="py-10">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Cor</th>
                            <th>Dono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.placa}</td>
                                <td>{row.modelo}</td>
                                <td>{row.cor}</td>
                                <td>{row.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Cadastrar_Window clientes={lista_clientes} />
        </main>
    );
}
