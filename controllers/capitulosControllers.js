const Capitulo = require('../models/capitulos');
const Proyectos = require('../models/series');

exports.obtenerCapitulos = async (req, res) => {
    try {
        const { anime } = req.query;
        const existeProyecto = await Proyectos.findById(anime); 
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Anime no encontrado' });
        }
        const capitulos = await Capitulo.find({ anime  }).sort({ creado: -1 });
        res.json({capitulos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}