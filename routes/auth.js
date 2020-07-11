//rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const auth = require('../middlewares/auth');

//Iniciar Sesion
// api/auth
router.post('/', 
    authControllers.authsUsers
);
//obtiene el usuario autenticado
router.get('/',
    auth,
    authControllers.usuarioAutenticado
);
module.exports = router;