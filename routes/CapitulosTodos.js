const express = require('express');
const router = express.Router();
const capitulosControllers = require('../controllers/capitulosControllers');


router.get('/', capitulosControllers.obtenerCapitulos);

module.exports = router;