const app = require('./config/server');
const connection = require('./config/db');//13.

require('./app/routes/controller')(app);

//Escuchar server en el puerto
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'));
});

module.exports = app;