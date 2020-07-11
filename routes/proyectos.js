const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoControllers');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');
//crea proyectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto);

router.get('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.obtenerProyectos);

//obtiene todos los proyectos
router.get('/',
    proyectoController.obtenerTodosProyectos);

//actualizar via ID 
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyectos);
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)
module.exports = router;