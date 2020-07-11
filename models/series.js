const mongoose = require('mongoose');
const proyectoSchema = mongoose.Schema({
    nombre:  {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: String,
        required: true,
        trim: true
    },
    creadorPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('series', proyectoSchema);