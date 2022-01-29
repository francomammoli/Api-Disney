//require bata base
let db = require("../../database/models");
const {validationResult} = require('express-validator');
const Op = db.Sequelize.Op

const characterController = {

    show:(req,res)=>{
        const query = req.query;
        
        //filter for name
        if(query.name){
            console.log(req.query);
            db.Personaje.findAll({
                where:{
                nombre: {
                    [Op.like]: '%' + req.query.name + '%'
                }
                },
            }).then((personaje)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:personaje.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        personaje
                    }
                }
                res.json({respuestaShow});
            });

            ////filter for age
        } else if(query.age){
            db.Personaje.findAll({
                where:{
                edad: {
                    [Op.like]:  req.query.age 
                }
                },
            }).then((personaje)=>{
                let respuestaShow = {
                    meta :{
                        status:200,
                        total:personaje.length,
                        url:'api/characters'
                    },
                    data: {
                        msg:'search results',
                        personaje
                    }
                }
                res.json({respuestaShow});
            });

            //all characters
    } else{
    db.Personaje.findAll({attributes: ['img', 'nombre']})
        .then(personaje => {
            let respuestaShow = {
                meta :{
                    status:200,
                    total:personaje.length,
                    url:'api/characters'
                },
                data: {
                    personaje
                }
            }
            res.json(respuestaShow);
        });
    }
    },

    detail:function(req,res){
        db.Personaje.findByPk(req.params.id)
        .then(personaje=>{
        let respuestaShowD = {
            meta :{
                status:200,
                total:personaje.length,
                url:'api/characters/:id'
            },
            data:personaje,
            }
            res.json(respuestaShowD);
        });
        },

    create:(req,res)=>{
    console.log(req.body);
    const resultvalidation = validationResult(req);
    if(resultvalidation.errors.length > 0){
        return res.send(errors);
        }
    db.Personaje.create({
        img: req.file.filename,
        nombre: req.body.nombre,
        edad: req.body.edad,
        historia: req.body.historia,
    });
    return res.json({
        meta :{
            status:200,
            url:'api/characters/'
        },
        data:"Personaje creado con exito"
        
    });
    },

    edit: function(req,res){
        db.Personaje.update({
            img:req.file.filename,
            nombre: req.body.nombre,
            edad: req.body.edad,
            historia: req.body.historia,
        },{
            where:{
                idpersonaje: req.params.id
            },
        });
        return res.json({
            meta :{
                status:200,
                url:'api/characters/:id'
            },
            data:"Personaje editado con exito"
            
        });
    },

    delete:(req,res)=>{
            db.Personaje.destroy({
            where:{
                idpersonaje: req.params.id
            }
            });
            return res.json({
                meta :{
                    status:200,
                    url:'api/characters/:id'
                },
                data:"Personaje eliminado con exito"
                
            });
    },
}

module.exports = characterController;