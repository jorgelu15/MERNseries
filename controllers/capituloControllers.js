const Capitulo = require('../models/capitulos');
const Proyectos = require('../models/series');
const { validationResult } = require('express-validator');

//creacion de nuevos capitulos
exports.crearCapitulos = async (req, res) => {

    //revision de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //extraer el anime
        const { anime } = req.body;
        
        const existeProyecto = await Proyectos.findById(anime); 
        
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Anime no encontrado' });
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //creamos el capitulo
        const capitulo = new Capitulo(req.body);
        await capitulo.save();

        res.json({capitulo});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCapitulos = async (req, res) => {
    try {
        const { anime } = req.query;
        const existeProyecto = await Proyectos.findById(anime); 
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Anime no encontrado' });
        }
        
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        const capitulos = await Capitulo.find({ anime  });
        
        res.json({capitulos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.actualizarCapitulos = async (req, res) => {

    try {
        const { anime, nombre, video } = req.body;

        //si la tarea existe o no
        let capitulo = await Capitulo.findById(req.params.id);

        if(!capitulo) {
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        //extraer proyecto
        const existeAnime = await Proyectos.findById(anime); 

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeAnime.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //crear objeto con la nueva informacion

        const nuevoCapitulo = {};

        nuevoCapitulo.nombre = nombre;
        nuevoCapitulo.video = video;

        capitulo = await Capitulo.findByIdAndUpdate({_id: req.params.id}, 
            nuevoCapitulo, 
            {new: true});
        
        res.json({capitulo});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCapitulos = async (req, res) => {
    try {
        const { anime } = req.query;

        //si la tarea existe o no
        let capitulo = await Capitulo.findById(req.params.id);

        if(!capitulo) {
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        //extraer proyecto
        const existeAnime = await Proyectos.findById(anime); 

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeAnime.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }


        //elimnar
        await Capitulo.findByIdAndRemove({_id: req.params.id}).sort({creado: -1});
        res.json({msg: 'Capitulo eliminado'});
        
        res.json({capitulo});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}