import './ObraLista.css'
import { obras } from 'mocks/obras'



export const ObraLista = () => {

    const [obraSelecionada, setObraSelecionada] = useState({});

    

    return (

        <div className="PaletaLista">
            {obras.map((obra, index) =>
                <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
                    <div>
                        <div className="PaletaListaItem__titulo">{obra.titulo} </div>
                        <div className="PaletaListaItem__preco">{obra.preco.toFixed(2)}</div>
                        <div className="PaletaListaItem__descricao"> {obra.descricao} </div>
                        <div className="PaletaListaItem__acoes Acoes">
                            <button className="Acoes__adicionar Acoes__adicionar--preencher">adicionar</button>
                        </div>
                    </div>
                    <img className="PaletaListaItem__foto" src={obra.foto} alt={`Paleta de ${obra.sabor}`} />
                </div>
            )}
        </div>

    )
}