import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authActions from '../redux/actions/authActions'
function Header(props) {


    return ( 
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/lista">Listas</Link>
           {props.usuario.userName !== '' && <Link to="/formulario">Formulario</Link>}
            {
                props.usuario.userName === '' ? (<>
                <Link to="/registro">Registro</Link>
                <Link to="/inicioSesion">Inicio sesion</Link>
                </>)
                :
                <Link to="/" onClick={props.logOut}>Log out</Link>
            }
        </nav>
        {props.usuario.userName !== '' ? <h1>Bienvenido {props.usuario.userName.slice(0,props.usuario.userName.indexOf('@'))}</h1> : <h1>No estas registrado</h1>}
    </header> );
}
const mapStateToProps = (state) =>{
    return {
        usuario: state.authReducer.usuario
    }
} 
const mapDispatchToProps = {
    logOut: authActions.logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);