import React, { useState } from 'react';
import {connect} from 'react-redux'
import filtroActions from '../redux/actions/filtroActions'

const Ejemplo = (props)=>{

    console.log("props: ");
    console.log(props);
    
    // const [productos, setProductos] = useState(props?.productos)

    const [detalleProducto, setDetalleProducto] = useState(false)

    console.log();
    return(
        <div>
            EJEMPLOS
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        productos:state.filtroReducer.productos
    }
}
const mapDispatchToProps = {
    
    filtrar: filtroActions.filtrar
}

export default connect(mapStateToProps, mapDispatchToProps)(Ejemplo)