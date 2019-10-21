var express = require('express');
var Curso = require('../models/curso.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Curso.find({}).exec((err, cursos)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            cursos: cursos
        });
    });
});

app.get('/:id', function(req, res, next){
    Curso.findById(req.params.id, (err, curso)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            curso: curso
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var curso = new Curso({
        codigo: body.codigo,
        titulo: body.titulo,
        imagen: body.imagen,
        horas: body.horas,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin,
        autor: body.autor,
        unidades: body.unidades,
    });
    curso.save((err, cursoGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear curso',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            curso: cursoGuardado
        });
    }); 
});

app.put('/:id', function(req, res, next){
    Curso.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err); 
        res.json({ 
            ok: 'true',
            mensaje: 'Curso actualizado'
        });
    });
});

app.put('/unidad/:id/:index', (req, res, next)=>{
    var body = req.body;
    Curso.findById(req.params.id, (err, curso)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };
        curso.unidades[req.params.index] = body;
        curso.save((err, cursoMod)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar curso',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Curso actualizado correctamente'
            });
        });
    });
});


app.delete('/:id', function(req, res, error){
    Curso.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        res.status(200).json({
            ok: 'true',
            mensaje: 'Curso eliminado'
        });
    });

});

app.delete('/unidad/:id/:index', function(req, res, error){
    Curso.findById(req.params.id, (err, curso)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };
        curso.unidades.splice(req.params.index, 1);
        curso.save((err, cursoMod)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar curso',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Curso actualizado correctamente'
            });
        });
    });
});

module.exports = app;
