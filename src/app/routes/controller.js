// Rutas
const bcryptjs = require('bcryptjs');
const connection = require('../../config/db');
const app = require('../../config/server');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('../views/index.ejs');
    })


//estableciendo las rutas a las vistas

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/bodega', (req, res) => {
    res.render('auth');
})

app.get('/aprende_mas', (req, res) => {
    res.render('aprende_mas');
})





//Registro de usuarios

app.post('/register', async (req, res) => {
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const movil = req.body.movil;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO usuarios SET ?', {
            usuario:usuario,
            nombre: nombre,
            apellido: apellido,
            movil:movil,
            ciudad:ciudad,
            direccion:direccion,
            email:email,
            password:passwordHaash
    }, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register',{
                alert:true,
                alertTitle:"¡Felicidades!",
                alertMessage: "Registro Exitoso",
                alertIcon:'Success',
                showConfirmButton:false,
                timer:1500,
                ruta:'login'
            })
        }
    })
})

//Autenticación de Usuario para Loguearse

app.post('/auth', async (req, res) =>{
    const usuario = req.body.usuario;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);
    if(usuario && password){
        connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
                console.log(password)
                res.render('login',{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon:'error',
                    showConfirmButton:true,
                    timer:3000,
                    ruta:'login'
                })
            }else{
                req.session.loggedin = true;
                req.session.nombre = results[0].nombre
                res.render('login',{
                    alert:true,
                    alertTitle:"Conexión Exitosa",
                    alertMessage: "LOGIN CORRECTO",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'auth'
                })
            }
        })
    }else{
        res.render('login',{
            alert:true,
            alertTitle:"Advertencia",
            alertMessage: "Por favor ingrese un usuario y un password",
            alertIcon:'warning',
            showConfirmButton:true,
            timer: 3000,
            ruta:'login'
        })
    }
})


//Auth vista luego de inicio de sessión

app.get('/auth', (req, res)=>{
    if(req.session.loggedin){
        res.render('auth', {
            login: true,
            nombre: req.session.nombre
        })
    }else{
        res.render('index', {
            login: false,
            nombre: 'Debe Iniciar Sessión'
        })
    }
})

//Cerrar session - destruir el password
app.get('logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

app.post('/', async (req, res) => {
    try {
      const { nombre, email, telefono, asunto, mensaje } = req.body;
    console.log(req.body);
    let login = req.session.isloggedin ? true : false;
    connection.query(
      "INSERT INTO contacto SET ?",{
        nombre: nombre,
        email: email,
        telefono: telefono,
        asunto: asunto,
        mensaje: mensaje,},
        async (error, results) => {
        if (error) {
          console.log("Que error tengo: " + error);
        } else {
          res.render("index.ejs", {
            login,
            alert: true,
            alertTitle: "Enviado",
            alertMessage: "¡Te estaremos contactando!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 3000,
            ruta: "auth"
          });
        }
      }
    );
    } catch (error) {
      console.log('Error: '+error);
    }
  })
 

}
