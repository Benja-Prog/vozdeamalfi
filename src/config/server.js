//Traer Modulos

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');


//Inicializar el servidor
const app = express();

//Configurar puerto
app.set('port', process.env.PORT || 3500);

//Configurar gestor de plantillas
app.set('view engine', 'ejs'); 

//Configurar las vistas
app.set('views', path.join(__dirname, '../app/views')); 

//Middlewares (Para recibir informacion de formularios)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Invocamos a dotenv
dotenv.config({path: path.join(__dirname, '../env/.env')});

//configurar el directorio css en public
app.use('/resources', express.static(path.join(__dirname, '../public')));
app.use('/resources', express.static(__dirname + '/public'));

//Configurar el manejo de sessiones dentro de la aplicacion
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));



module.exports = app;