import './Home.css'
import { ObraLista } from 'ObraLista'
import sacola from 'assets/icones/sacola.svg'
import logo from 'assets/images/logo.svg'

// function Home () {
//     return <div className="Home">Este é o componente Home</div>
// }



const Home = () => {
    return (<div className="Home">
        <div className="Home__header Header">
            <div className="row">
                <div className="Header__logo Logo">
                    <img src={logo} width="70px" alt="Logo El Geladon" className="Logo__icone" />
                    <span className="Logo__titulo"> El Geladon </span>
                </div>
                <div className="Header__opcoes Opcoes">
                    <div className="Opcoes__sacola Sacola">
                        <img src={sacola} width="40px" className="Sacola__icone" alt="Sacola de compras" />
                    </div>
                </div>
            </div>
        </div>
        <div className="Home__container">
            <ObraLista />
        </div>
    </div>)
}

export default Home
