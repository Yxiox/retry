import "./style.css";

export default function Home(){

    return(
        <main>
            <div id="main_div">
                <div id="main_buttons">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 rounded">Período</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 rounded">Dia</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 rounded">Mês</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  px-4 rounded">Geral</button>
                </div>

                <div id="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Carro</th>
                                <th>Data Entrada</th>
                                <th>Data Saída</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* {movimentos.map((row, index) => (
                            <tr key={index}>
                            <td>{row.hora_entrada}</td>
                            <td>{row.placa}</td>
                            <td>{row.modelo}</td>))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}