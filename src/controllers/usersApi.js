//require data base
let db = require("../../database/models");
const {validationResult} = require('express-validator');
//libreria para hashear la pw
const bcryptjs = require('bcryptjs');
//require jwt
const jwt = require('jsonwebtoken');
//require sendgrid
const sgMail = require('@sendgrid/mail');
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const usersController = {

    
    register:(req,res)=>{
        const resultvalidation = validationResult(req);
        if(resultvalidation.errors.length > 0){
            return res.send(errors);
            }
            //verificamos si el usuario ya esta registrado 
            db.Usuario.findAll().then((users) => {
                let userInDB = users.find((i) => i.email == req.body.email)
                if (userInDB) {
                return res.json({data:"email ya registrado"});
                } else {
                db.Usuario.create({
                    nombre:req.body.nombre,
                    email:req.body.email,
                    pasword:req.body.password,
                })
                }
                jwt.sign({userInDB},'secretKey',(err,token)=>{
                    res.json({
                        data:"Welcome",
                        token,
                    });
                });
            });
            const msg = {
                to: 'francomammoli@hotmail.com', //req.email
                from: 'test@example.com', 
                subject: 'Sending with SendGrid is Fun',
                text: 'Bienvenido!',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            };
            sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
            })
            .catch((error) => {
            console.error(error)
            })
    },
    login:(req,res)=>{
        const resultvalidationL = validationResult(req);
        if(resultvalidationL.errors.length > 0){
            return res.json({error: errors});
        }
        db.Usuario.findAll().then((users) => {
            let userToLogin = users.find((i) => i.email == req.body.email);
            if (userToLogin) {
            jwt.verify(req.token, 'secretKey',(error,userToLogin)=>{
                if(error){
                    res.sendStatus(403);
                } else if (req.body.password == userToLogin.pasword){   
                        return res.json({data: "Usuario ingresado"});
                }
                return res.json({data: "credenciales invalidas"});
            });
            return res.json({data:"email inexistente"});
        }
        })
    },
    
}


module.exports = usersController;