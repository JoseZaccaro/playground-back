const axios = require('axios')

const authActions = {

    registrarUsuario: (userName,password) =>{
        return async(dispatch, getState)=>{
            try {
                // eslint-disable-next-line
                const user = await axios.post('https://lista-productos-playground.herokuapp.com/api/auth/signUp',{userName,password})
                // Una ves Hosteada la pagina debemos cambiar todas las rutas de localhost por la url de nuestro host
                
                if(user.data.success && !user.data.error){
                    localStorage.setItem('token',user.data.response.token)
                    dispatch({type:'usuario', payload:{userName}})
                    return {errores: [{message:"Successfully logged in"}]}
                }else{
                    // alert(user.data.error)
                    console.error(user.data.response)
                    return {errores: user.data.errores}
                }
            }catch(error){
                
            }
        }
    },
    iniciarSesion: (userName,password) => {
        return async(dispatch, getState)=>{
            try {
                const user = await axios.post('https://lista-productos-playground.herokuapp.com/api/auth/signIn',{userName, password})
                if(user.data.success && !user.data.error){
                    localStorage.setItem('token',user.data.response.token)
                    dispatch({type:'usuario', payload:{userName:user.data.response.userName}})
                    return {errores: [{message:"Successfully logged in"}]}
                }else{
                    console.log(user.data)
                    return {errores: [{message:"error trying to sign in"}]}

                    // alert(user.data.error)
                }
            }catch(error){
                console.error(error)
            }
        }
    },
    logOut: () => {
        return (dispatch, getState)=>{
            localStorage.clear()
            dispatch({type:'logOut'})
        }
    }
}

export default authActions