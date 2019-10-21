var mongoose = require('mongoose');

var CursoSchema = new mongoose.Schema({ 
    codigo: String,
    titulo: String,
    imagen: String,
    horas: Number,
    fechaInicio: Object,
    fechaFin: Object,
    autor: String,
    unidades: [{titulo: String, duracion: String}]
});

module.exports = mongoose.model('Curso', CursoSchema);
