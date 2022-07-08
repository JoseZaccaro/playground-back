import React from 'react'
import {connect} from 'react-redux';
import authActions from '../redux/actions/authActions'
import {toast} from 'react-toastify'
import Inputs from '../components/Inputs'
import Header from "../components/Header";

const Registro = (props)=>{

    const handleSubmit = async (userName, password)=>{
        const errores = await props.registrarUsuario(userName,password)
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
            <h1 style={{width: '100%',textAlign:'center'}}> Registrate</h1>
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
    registrarUsuario: authActions.registrarUsuario
 }

export default connect(mapStateToProps, mapDispatchToProps)(Registro)