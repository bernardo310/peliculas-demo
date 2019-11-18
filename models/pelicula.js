const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peliculaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    protagonistas: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('Pelicula', peliculaSchema);