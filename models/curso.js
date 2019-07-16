var mongoose = require('mongoose');

var CursoSchema = new mongoose.Schema({ 
    codigo: String,
    titulo: String,
    imagen: String,
    fechaInicio: Object,
    fechaFin: Object,
    unidades: Object,
    alumnos: Object
});

module.exports = mongoose.model('Curso', CursoSchema);
