const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//creacion del servidor
const app = express();

//conecta la base de datos
connectDB();

//habilitacion de cors
app.use(cors());


//habilitar express.json
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//importacion de rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/proyectosTodos', require('./routes/proyectostodos'));
app.use('/api/capitulos', require('./routes/capitulos'));
app.use('/api/capitulo', require('./routes/capitulostodos'));
//arranca la app
app.listen(PORT, () => {
    console.log("server on");
});