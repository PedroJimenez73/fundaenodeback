var mongoose = require('mongoose');

var CursoSchema = new mongoose.Schema({ 
    codigo: String,
    titulo: String,
    imagen: String,
    horas: Number,
    fechaInicio: String,
    fechaFin: String,
    autor: String
});

module.exports = mongoose.model('Curso', CursoSchema);
