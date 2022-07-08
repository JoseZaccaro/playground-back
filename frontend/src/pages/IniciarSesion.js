import React from 'react'
import {connect} from 'react-redux';
import authActions from '../redux/actions/authActions'

import Inputs from '../components/Inputs'
import Header from "../components/Header";
import {toast} from 'react-toastify'

const IniciarSesion = (props)=>{

    const handleSubmit = async (userName, password)=>{
        const errores = await props.iniciarSesion(userName,password)
        console.log(errores)
        if (errores.errores) {
            errores.errores.map(e=> toast(e.message,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                
            }))
        }
    }

    return (
        <div className="container">
            <Header nombreUsuario={props.usuario.userName}/>
            <h1 style={{width: '100%',textAlign:'center'}}> Inicia sesión</h1>
            <main className="main-formulario">
                <Inputs data={{first:'Usuario',second:'Constraseña'}} handleSubmit={handleSubmit}/>
            </main>
        </div>
    )
}

    
const mapStateToProps = (state) =>{
    return {
        usuario: state.authReducer.usuario
    }
 }
 const mapDispatchToProps = {
    iniciarSesion: authActions.iniciarSesion
 }

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion)