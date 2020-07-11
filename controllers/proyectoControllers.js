const Proyectos = require('../models/series');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
    
    //revision de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    try{
        //crear nueva proyecto
        const proyecto = new Proyectos(req.body);

        //guardar creador
        proyecto.creadorPost = req.usuario.id;

        proyecto.save();

        res.json(proyecto);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyectos de usuario actual

exports.obtenerProyectos = async (req, res) => {
    
    try {
        const proyectos = await Proyectos.find({creadorPost: req.usuario.id});
        
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTodosProyectos = async (req, res) => {
    
    try {
        const proyectos = await Proyectos.find(req.body).sort({creado: -1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar un proyecto
exports.actualizarProyectos = async (req, res) => {

    //Revision de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraccion de informacion de proyecto

    const {nombre, creador} = req.body;
    const nuevoProyecto = {};

    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }

    if(creador) {
        nuevoProyecto.creador = creador;
    }



    try {
        //revisar el ID
        let proyecto = await Proyectos.findById(req.params.id);//revisar si es id o creador
    

        //si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }


        //verificar el creador del proyecto
        if(proyecto.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }



        //actualizar proyecto
        proyecto = await Proyectos.findByIdAndUpdate({_id: req.params.id}, 
                {$set: nuevoProyecto}, 
                {new: true});
        res.json({proyecto});




    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarProyecto = async (req, res) => {


    try {
        //revisar el ID
        let proyecto = await Proyectos.findById(req.params.id);//revisar si es id o creador
    

        //si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }


        //verificar el creador del proyecto
        if(proyecto.creadorPost.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }



       //eliminar el Proyecto
       await Proyectos.findOneAndRemove({_id: req.params.id});
       res.json({msg: 'Proyecto eliminado'});




    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }





}