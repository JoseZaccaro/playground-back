require('dotenv').config()
const express = require('express');
const cors = require('cors');
const Router = require('./routes/routes')
require('./config/database')
const passport = require('passport')
const app = express();

//  importamos path
const path = require('path');

//middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize())

app.use('/api', Router)

// Si la aplicacion se encuentra en produccion 
if (process.env.NODE_ENV === 'production') {
    // la carpeta de archivos estaticos va a ser la ruta siguiente
    app.use(express.static('client/build'))
    // Cualquier pedido de tipo get
    app.get('*', (req, res)=>{
        // Va a devolver el archivo index.html 
        // porque es la unica vista ya que react se encarga de renderizar todas las "paginas" del sitio
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
}

// process.env.PORT = el PORT que define heroku 
// 4000 = el puerto que usamos en desarrollo
// process.env.HOST = el HOST que definimos en nuestro env en desarrollo
// '0.0.0.0' = accesible para cualquier HOST desde heroku
app.listen( process.env.PORT || 4000, process.env.HOST || '0.0.0.0' ,()=> console.log(`Server listening on port ${process.env.PORT || 4000}`))