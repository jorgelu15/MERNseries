const mongoose = require('mongoose');

const capituloSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: String,
        requerid: true, 
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'series'
    }
});

module.exports = mongoose.model('capitulos', capituloSchema)