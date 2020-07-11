const express = require('express');
const router = express.Router();
const capitulosController = require('../controllers/capituloControllers');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');


router.post('/', auth, [check('nombre', 'El nombre es obligatorio')], capitulosController.crearCapitulos);
router.get('/', auth, capitulosController.obtenerCapitulos);
router.put('/:id', auth,  capitulosController.actualizarCapitulos);
router.delete('/:id', auth, capitulosController.eliminarCapitulos);

module.exports = router;