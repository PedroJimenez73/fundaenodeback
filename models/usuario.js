var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    dni: String,
    email: String,
    // email: {type: String, unique: true},
    password: String,
    roles: Array,
});

//UsuarioSchema.plugin(unique, {message: 'Nombre de usuario ya se encuentra en uso'});

module.exports = mongoose.model('Usuario', UsuarioSchema);