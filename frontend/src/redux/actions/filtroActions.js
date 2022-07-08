import axios from 'axios';

const filtroActions = {
    
    fetchearProductos: () =>{
       return async(dispatch, getState) => {
            const res = await axios.get('https://lista-productos-playground.herokuapp.com/api/productos')
            // .then(res => dispatch({type:'fetch', payload:res.data.respuesta}))
            dispatch({type:'fetch', payload:res.data.respuesta})
       }
    },
    borrarProducto: (id)=>{
        return async(dispatch, getState) => {
            const token = localStorage.getItem('token')
            try {
            
            const res = await axios.delete('https://lista-productos-playground.herokuapp.com/api/productos/'+id,{
                headers:{
                    'Authorization': 'Bearer '+token
                }
            })

            dispatch({type:'delete', payload:res.data.respuesta})

            }catch(err){
                console.log(err)
            }
        }
    },
    filtrar: (productos, value)=>{
        return (dispatch,getState)=>{
            dispatch({type:'filtro', payload:{productos, value}})
        }
    },
    cargarProducto: (name,precio)=>{
        return async(dispatch,getState)=>{
            const token = localStorage.getItem('token')
            const respuesta = await axios.post('https://lista-productos-playground.herokuapp.com/api/productos',{name,precio},{
                headers:{ 
                    'Authorization':`Bearer ${token}`
                }
            })
            dispatch({type:'cargarProducto', payload:respuesta.data.respuesta})

        }
    }





}

export default filtroActions;