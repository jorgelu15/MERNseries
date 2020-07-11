const Proyectos = require('../models/series');


//extrae todos los animes
exports.obtenerTodosProyectos = async (req, res) => {
    
    try {
        const proyectos = await Proyectos.find(req.body).sort({creado: 1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
