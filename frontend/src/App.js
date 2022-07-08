// import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Lista from './pages/Lista'
import Formulario from './pages/Formulario'
import ElementoSinProps from './pages/Elemento'
import {withRouter} from './utils/withRouter'
// import axios from 'axios'
import Registro from './pages/Registro'
import IniciarSesion from './pages/IniciarSesion'
import {connect} from 'react-redux';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Elemento = withRouter(ElementoSinProps)

const App = (props)=> {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Lista />} />
        {props.usuario.userName !== '' && <Route path="/formulario" element={<Formulario />} />}
        {props.usuario.userName === '' && <Route path="/registro" element={<Registro />} />}
        {props.usuario.userName === '' && <Route path="/inicioSesion" element={<IniciarSesion />} />}
        
        <Route path="/:endpoint/:id" element={<Elemento />} />
        <Route path="*" element={<Home/>}/>
      </Routes>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

    </BrowserRouter>
  );
}

const mapStateToProps = (state) =>{
  return{
    usuario: state.authReducer.usuario
  }
}

export default connect(mapStateToProps)(App);
