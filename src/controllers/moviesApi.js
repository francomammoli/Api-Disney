//require data base
let db = require("../../database/models");
const {validationResult} = require('express-validator');
const Op = db.Sequelize.Op

const moviesController = {

    show:(req,res)=>{
        const query = req.query;
        
        //filter for title
        if(query.name){
            db.Pelicula.findAll({
                where:{
                titulo: {
                    [Op.like]: '%' + req.query.name + '%'
                }
                },
            }).then((pelicula)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:pelicula.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        pelicula
                    }
                }
                res.json({respuestaShow});
            });

            //filter for gender
        } else if(query.genre){
            db.Pelicula.findAll({
                where:{
                genero_idgenero: {
                    [Op.like]: '%' + req.query.genre + '%'
                }
                },
            }).then((pelicula)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:pelicula.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        pelicula
                    }
                }
                res.json({respuestaShow});
            });

            //all movies
        } else if (query.order == 'ASC'){
            db.Pelicula.findAll({
                order:['fecha_creacion','ASC'],
            }).then((pelicula)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:pelicula.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        pelicula
                    }
                }
                res.json({respuestaShow});
            });
        } else if (query.order == 'DESC'){
            db.Pelicula.findAll({
                order:['fecha_creacion','DESC'],
            }).then((pelicula)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:pelicula.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        pelicula
                    }
                }
                res.json({respuestaShow});
            });
        }
        else{
        db.Pelicula.findAll({attributes: ['img', 'titulo','fecha_creacion']})
        .then(pelicula => {
            let respuestaShowP = {
                meta :{
                    status:200,
                    total:pelicula.length,
                    url:'api/movies'
                },
                data:pelicula
            }
            res.json(respuestaShowP);
        });
    }
    },

    detailmovies:function(req,res){
        db.Pelicula.findByPk(req.params.id)
        .then(pelicula=>{
        let respuestaShowDM = {
            meta :{
                status:200,
                total:pelicula.length,
                url:'api/movies/:id'
            },
            data:pelicula
            }
            res.json(respuestaShowDM);
        });
        },

    create:(req,res)=>{
        const resultvalidation = validationResult(req);
        if(resultvalidation.errors.length > 0){
            return res.send(errors);
            }
        db.Pelicula.create({
            titulo:req.body.titulo,
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion,
            genero_idgenero: req.body.genero_idgenero,
            img: req.file.filename,
        });
        },

    edit: function(req,res){
        db.Pelicula.update({
            titulo:req.body.titulo,
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion,
        },{
            where:{
                idpelicula: req.params.id
            },
        });
    },

    delete:(req,res)=>{
        db.Pelicula.destroy({
            where:{
                idpelicula: req.params.id
            }
        });
        
    },
}

module.exports = moviesController;