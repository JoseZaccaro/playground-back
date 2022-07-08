import React,{ useState } from 'react'
import Header from "../components/Header";

const Prueba = (props)=>{

const [visible, setVisible] = useState(false)

    return (
        <div className="container">
            <Header/>
            <h1 style={{width: '100%',textAlign:'center'}}> Prueba</h1>
            <main className="main-formulario">
                <div className="prueba-transition">
                    <div onClick={()=>setVisible(!visible)} className="prueba-boton">clickeame</div>
                    <div className={ visible ? "prueba-contenido-oculto visible" : "prueba-contenido-oculto" }> soy el contenido oculto </div>
                </div>
            </main>
        </div>
    )
}

export default Prueba