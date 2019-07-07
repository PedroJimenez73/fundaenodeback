var express = require('express');
var bcryptjs = require('bcryptjs');
var Usuario = require('../models/usuario.js');
var app = express();
var autenToken = require('../middleware/autentoken.js');

app.get('/', /*autenToken.verificarToken,*/ (req, res, next)=>{
    Usuario.find({}).exec((err, usuarios)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            usuarios: usuarios 
        });
    });
});

app.get('/clientes', /*autenToken.verificarToken,*/ (req, res, next)=>{
    Usuario.find({rol:"Cliente"}).exec((err, usuarios)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            usuarios: usuarios 
        });
    });
});

app.get('/:id', /*autenToken.verificarToken,*/ function(req, res, next){
    Usuario.findById(req.params.id, (err, usuario)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuario
        });
    });
});

app.post('/', /*autenToken.verificarToken,*/ function(req, res, next){
    var body = req.body;
    console.log(body);
    var usuario = new Usuario({
        nombre: body.nombre,
        password: bcryptjs.hashSync(body.password, 10),
        rol: body.rol,
    });
    usuario.save((err, usuarioGuardado)=>{ 
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente',
            id: usuarioGuardado._id
        });
    });
});


app.put('/:id', /*autenToken.verificarToken,*/ (req, res, next)=>{
    var body = req.body;
    Usuario.findById(req.params.id, (err, usuario)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;
        usuario.validacion = body.validacion;
        usuario.save((err, usuarioModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar usuario',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            });
        });
    });
});

app.put('/cliente/:id', (req, res, next)=>{
    var body = req.body;
    Usuario.findById(req.params.id, (err, usuario)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };
        usuario.perfil = body;
        usuario.save((err, usuarioModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar usuario',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            });
        });
    });
});

app.delete('/:id', /*autenToken.verificarToken,*/ function(req, res, error){
    Usuario.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Usuario ' + datos.nombre + ' eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });
});

module.exports = app;