const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usersControllers');
const { check } = require('express-validator');


//creacion de usuarios
// api/users
router.post('/', 
    //valido campos
    [check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 })],
    usuarioControllers.crearUsuario
);

module.exports = router;