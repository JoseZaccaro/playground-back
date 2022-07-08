import {useRef} from 'react'
import GoogleLogin from 'react-google-login';

function Inputs(props) {
    const inputNombre = useRef()
    const inputPrecio = useRef()
    const {handleSubmit, data} = props;

    const handleSubmitInputs = (e)=>{
        e.preventDefault()
        handleSubmit(inputNombre.current.value, inputPrecio.current.value)
        inputNombre.current.value = ''
        inputPrecio.current.value = ''
    }
    const responseGoogle = (res)=>{
        console.log(res)
        if(res.profileObj){
            handleSubmit(res.profileObj.email, res.profileObj.email )
        }
    }

    return ( <form onSubmit={handleSubmitInputs}>
                    <label style={{display: 'flex',flexDirection: 'column'}}>{!data?.first ? 'Nombre del producto:' : data.first}
                        <input className='input' type="text" ref={inputNombre} name="name"/>
                    </label>
                    <label style={{display: 'flex',flexDirection: 'column'}}>{!data?.second ? "Precio del producto:" : data.second}
                        <input className='input' type="text" ref={inputPrecio} name="precio"/>
                    </label>
                    <input type="submit" value="Enviar"/>
                    {   data?.first &&
                        <GoogleLogin
                            clientId="792597804652-7pt8nl335rt8mi2fjod6eb5rb23h132p.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    }
                </form>);
}

export default Inputs;