import { sql } from "@vercel/postgres"
import "./style.css"

export default async function Estacionar_Window() {
    
    const { rows } = await sql`Select id, nome from cliente`
        
    // Função para enviar dados do carro para o backend
    const addCar = async (model: string, plate: string, color: string, client_id: number) => {
    const response = await fetch('/api/addCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, plate, color, client_id }),
    });
    const data = await response.json();
    console.log(data);
  };
  


    return(
        <div id="cadastrar_veiculo" className="rounded">
            <div>
            <input type="text" name="placa" id="placa" />
            <input type="text" name="modelo" id="modelo" />

            </div>
            <div>

            <input type="text" name="cor" id="cor" />
            <select className="border p-2">
                 {rows.map((row) => ( <option key={row.id} value={row.id}> {row.nome} </option> ))}
            </select>
            </div>
            <button className="bg-gray-500 hover:bg-gray-700 text-white  px-4 py-1 my-4 rounded w-1/2">Adicionar</button>
        </div>
    )
}