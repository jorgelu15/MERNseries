const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosControllers');
//obtiene todos los proyectos
router.get('/',
    proyectosController.obtenerTodosProyectos);
module.exports = router;