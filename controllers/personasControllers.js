const Persona = require('../models/Persona')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authControllers = {

    // + al momento de registrar usuarios en nuestra aplicación, 
    // + hay situaciones que tenemos tener en cuenta  
    // + cuales son estas situaciones a tener en cuenta ?

    // - 1) que no haya usuarios repetidos
    // - 2) seguridad de la contraseña
    // - 3) validacion de datos


    nuevoUsuario: async(req, res) => {
        
        let { userName, password } = req.body      
        // tengo que hashear (hash) la contraseña y guardarla en la base de datos
        try {

            const usuarioExiste = await Persona.findOne({userName})
            if (usuarioExiste){
                res.json({success: false, errores:[{message:"El nombre de usuario ya esta en uso"}], response:null})
            }else{

                const contraseñaHasheada = bcryptjs.hashSync(password, 10)

                const nuevoUsuario = new Persona({
                    userName, 
                    password:contraseñaHasheada
                })

                const token = jwt.sign({...nuevoUsuario}, process.env.SECRET_KEY)
                await nuevoUsuario.save()
                res.json({success: true, response: {token,nuevoUsuario}, error: null})
            }
        
        }catch(error){
            res.json({success: false, response: null, error: error})
        }

        
    },
    accederACuenta: async(req, res)=>{
        const { userName, password } = req.body
        try {
            const usuarioExiste = await Persona.findOne({userName})
            if (!usuarioExiste){
                res.json({success: true, error:"El usuario y/o contraseña incorrectos"})
            }else{
                let contraseñaCoincide = bcryptjs.compareSync(password, usuarioExiste.password)
                if (contraseñaCoincide) {
                    const token = jwt.sign({...usuarioExiste}, process.env.SECRET_KEY)
                    res.json({success:true, response:{token,userName} ,error:null})
                }else{
                    res.json({success: true, error:"El usuario y/o contraseña incorrectos"})
                }
            }

        }catch(error){
            console.log(error);
            res.json({success: false, response: null, error: error})
        }
    }


}

module.exports = authControllers;